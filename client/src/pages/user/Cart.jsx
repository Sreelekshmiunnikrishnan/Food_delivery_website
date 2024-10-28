import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/Card";
import { toast } from 'react-toastify';
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const navigate = useNavigate();
    const [cartData, isLoading, error] = useFetch("/cart/getcart");
    if(!cartData){
   toast.error("cart can't be fetched");
    }
    /* const makePayment = async() =>{
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance({
                url : "/payment/create-checkout-session",
                method : "POST",
                data : { products : cartData?.menus},
                 });
                 console.log(session);
                 const result = stripe.redirectToCheckout({
                    sessionId : session.data.id,
                 })
        } catch (error) {
            console.log(error);
            
        }
    } */

     const handleRemoveItem = async (menuId) => {
        try {
            console.log({menuId});
            
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-menu",
                data: { menuId:menuId } ,
            });
            if(response){
                navigate("/user/cart");
                toast.success("Item removed from cart");
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
        <button className="btn btn-secondary flex items-center justify-center w-1/3 px-4" disabled={!cartData?.menus?.length}>
            Checkout
        </button>
    </div>
</div>

    );
};