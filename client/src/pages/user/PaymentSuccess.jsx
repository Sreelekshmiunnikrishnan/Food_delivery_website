// PaymentSuccess.js
import React, { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PaymentSuccess = () => {

  const navigate = useNavigate();
  const cartData = JSON.parse(localStorage.getItem("cartData"));
 
    if (!cartData) {
      toast.error("Cart data not found. Please try again.");
      return;
    }
const handlePaymentSuccess = async() =>{
    try {
      // Add items to order history
      const response = await axiosInstance({
        url: "/order/createorder",
        method: "POST",
        data: cartData,
      });

      if (response) {
        console.log("Order placed successfully!");
        alert("Order placed successfully!");
      }

    await navigate("/user/order");
    } catch (error) {
      console.log("Error processing order:", error);
      alert("error peocessing order",error)
    }
  
  };

  useEffect(() => {
   
    handlePaymentSuccess();
  }, []);
  return (
  <div>
    Processing your order...</div>
);
};
