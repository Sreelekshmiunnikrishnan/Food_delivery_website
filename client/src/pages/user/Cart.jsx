import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/Card";
import { toast } from 'react-toastify';
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from 'react-redux';

export const Cart = () => {
    const navigate = useNavigate();
    const [cartData] = useFetch("/cart/getcart");
    const [quantities, setQuantities] = useState({}); // Use object to store quantities by menu ID

    // Initialize quantities when cartData loads
    useEffect(() => {
        if (cartData?.menus) {
            const initialQuantities = {};
            cartData.menus.forEach(item => {
                initialQuantities[item._id] = 1; // Default quantity of 1 per item
            });
            setQuantities(initialQuantities);
        }
    }, [cartData]);

    const handleQuantityChange = (menuId, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [menuId]: Math.max(1, (prevQuantities[menuId] || 1) + delta) // Prevent quantity going below 1
        }));
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
                        quantity: quantities[item._id] // Add quantity to each item
                    }))
                },
            });

            console.log(session, "===session");

            const result = await stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred while processing your payment. Please try again.");
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
                alert("Item removed from cart");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Error while removing product");
        }
    };

    return (
        <div className="flex justify-between">
            <div className="w-6/12">
                {cartData?.menus?.length ? (
                    cartData.menus.map((item) => (
                        <CartCards 
                            item={item} 
                            key={item._id} 
                            handleRemove={handleRemoveItem} 
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="w-96 h-60 flex bg-gray flex-col items-center gap-5">
                <h2>Price summary...</h2>
                <h2>Total Price: {cartData?.totalPrices?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</h2>

                {/* Quantity buttons with + and - */}
                <div className="flex flex-col items-center gap-2">
                    {cartData?.menus?.map(item => (
                        <div key={item._id} className="flex items-center gap-2">
                            <button onClick={() => handleQuantityChange(item._id, -1)} className="p-2 text-white bg-gray-500 rounded">-</button>
                            <span>{quantities[item._id]}</span>
                            <button onClick={() => handleQuantityChange(item._id, 1)} className="p-2 text-white bg-gray-500 rounded">+</button>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>

                <button 
                    className="btn btn-secondary flex items-center justify-center w-1/3 px-4"
                    onClick={makePayment}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};
