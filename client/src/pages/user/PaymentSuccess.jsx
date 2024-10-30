// PaymentSuccess.js
import React, { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    try {
      
      // Add items to order history
      const response = await axiosInstance({
        url: "/order/createorder",  // Endpoint to add items to order history
        method: "POST",
        data:  cartData ,
      });
      if(response){
      console.log("Order placed successfully!");
      }
     const clear = await axiosInstance({
      url:"cart/clear",
      method:"POST"
     } );

      if(clear){
        console.log("cart data cleared");
        
      }
      // Redirect to order page or home
      navigate("/user/order");
    } catch (error) {
      console.log("Error processing order:", error);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  return <div>Processing your order...</div>;
};
