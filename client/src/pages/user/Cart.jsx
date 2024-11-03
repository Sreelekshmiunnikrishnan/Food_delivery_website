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
    
        const makePayment = async () => {
            try {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
                const session = await axiosInstance({
                    url: "/payment/create-checkout-session",
                    method: "POST",
                    data: { products: cartData?.menus }, // Ensure cartData is defined
                });
        
               console.log(session,"===session");
               
                // Redirect to Stripe checkout
                const result = await stripe.redirectToCheckout({
                    sessionId: session.data.sessionId,
                });
        
                
               
            } catch (error) {
                console.error("Payment error:", error);
                alert("An error occurred while processing your payment. Please try again.");
            }
        };
        

   /*  const handlePaymentSuccess = async () => {
        try {
      
          // Add items to order history
          const response = await axiosInstance({
            url: "/order/createorder",  // Endpoint to add items to order history
            method: "POST",
            data:  cartData ,
          });
      
          console.log("Order placed successfully!");
        } catch (error) {
          console.log("Error adding order:", error);
        }
      };
 */
     const handleRemoveItem = async (menuId) => {
        try {
            console.log({menuId});
            
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-menu",
                data: {menuId :menuId}
            });
            if(response){
                navigate("/user/menu");
                //toast.success("Item removed from cart");
                alert("Item removed from cart")
            }
           
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "error while removing product");
           
        } 
    };

    return (
        <div className="flex justify-between">
    <div className="w-6/12">
        {cartData?.menus.length ? (
            cartData.menus.map((value) => (
                <CartCards item={value} key={value._id} handleRemove={handleRemoveItem} />
            ))
        ) : (
            <p>Your cart is empty.</p>
        )}
    </div>
    <div className="w-6/12 flex bg-gray-100 flex-col items-center gap-5">
        <h2>Price summary...</h2>
        <h2>Total Price: {cartData?.totalPrices?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</h2>
        <button className="btn btn-secondary flex items-center justify-center w-1/3 px-4"  onClick={makePayment}>
            Checkout
        </button>
    </div>
</div>

    );
};