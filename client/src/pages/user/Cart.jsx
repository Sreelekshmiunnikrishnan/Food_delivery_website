import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/Card";
import { toast } from 'react-toastify';
import { axiosInstance } from "../../config/axiosInstance";

export const Cart = () => {
    const [cartData, isLoading, error] = useFetch("/cart/getcart");
    if(!cartData){
   toast.error("cart can't be fetched");
    }
    

     const handleRemoveItem = async (menuId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/delete",
                data: { menuId : menuId },
            });
            setItems((prevItems) => prevItems.filter(item => item._id !== menuId));
            toast.success("Item removed from cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "error while removing product");
        } 
    };

    return (
        <div>
            {cartData?.menus.map((value) => (
                <CartCards item={value} key={value._id} totalPrices={cartData.totalPrices}  />
            ))}
        </div>
    );
};