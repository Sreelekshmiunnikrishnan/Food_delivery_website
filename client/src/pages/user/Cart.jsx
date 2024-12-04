import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/Card";
import toast from 'react-hot-toast';
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const navigate = useNavigate();
    const [cartData] = useFetch("/cart/getcart");
    const [quantities, setQuantities] = useState({});
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isCouponLoading, setIsCouponLoading] = useState(false);

    useEffect(() => {
        if (cartData?.menus) {
            const initialQuantities = {};
            cartData.menus.forEach(item => {
                initialQuantities[item._id] = 1;
            });
            setQuantities(initialQuantities);
        }
    }, [cartData]);

    const handleQuantityChange = (menuId, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [menuId]: Math.max(1, (prevQuantities[menuId] || 1) + delta)
        }));
    };

    const handleCouponApply = async () => {
        if (!couponCode) {
            return toast.error("Please enter a coupon code.");
        }

        setIsCouponLoading(true); // Show loading state

        try {
            const response = await axiosInstance({
                url: "/cart/apply-coupon",
                method: "POST",
                data: { couponCode }
            });
            if (response.data.discount) {
                setDiscount(response.data.discount);
                toast.success(`Coupon applied! Discount: ${response.data.discount}%`);
            } else {
                toast.error("Invalid coupon code.");
            }
        } catch (error) {
            console.error("Error applying coupon:", error);
            toast.error(error?.response?.data?.message || "Failed to apply coupon");
        } finally {
            setIsCouponLoading(false); // Hide loading state
        }
    };

    const makePayment = async () => {
        if (!cartData?.menus?.length) {
            return toast.error("Your cart is empty.");
        }
       
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: {
                    products: cartData.menus.map(item => ({
                       ...item,
                      quantity: quantities[item._id]
                    })),
                    discount,
                    
                },
            });

          const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });

            if (result.error) {
                console.error("Stripe checkout error:", result.error);
                toast.error("An error occurred during checkout. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred while processing your payment. Please try again.");
        }
    };

    const handleRemoveItem = async (menuId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-menu",
                data: { menuId },
            });
            if (response) {
                navigate("/user/menu");
                toast.success("Item removed from cart");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Error while removing product");
        }
    };

    // Calculate the price after discount
    const getTotalPrice = () => {
        const total = cartData?.totalPrices || 0;
        return total - (total * (discount / 100));
    };

    return (
        <div className="flex justify-between">
            <div className="w-6/12 flex overflow-x-auto gap-6 p-4 ">
                {cartData?.menus?.length ? (
                    cartData.menus.map((item) => (
                        <CartCards
                            item={item}
                            key={item._id}
                            handleRemove={handleRemoveItem}
                            handleQuantityChange={handleQuantityChange}
                            quantities={quantities}
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="w-128 h-128 flex bg-gray flex-col items-center gap-5">
                <h2 className="text-red-500">Limited Offer!!!</h2>
                <p className="text-yellow">Apply Coupon code "DISCOUNT10" to avail discount on items..</p>
                <h2 className="text-yellow">Price summary...</h2>
                <h2 className="text-green">
                    Total Price: {getTotalPrice().toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                </h2>

                <div className="flex flex-col items-center gap-2 mt-4">
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleCouponApply}
                        className="p-2 text-white bg-blue-500 rounded"
                        disabled={isCouponLoading}
                    >
                        {isCouponLoading ? "Applying..." : "Apply Coupon"}
                    </button>
                </div>

                <button
                    className="btn btn-secondary flex items-center justify-center w-1/3 mt-15 px-4"
                    onClick={makePayment}
                    disabled={cartData?.menus?.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
