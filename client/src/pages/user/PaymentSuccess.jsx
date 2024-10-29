// PaymentSuccess.js
import React, { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cartData")); // Example of accessing cart data

      // Add items to order history
      await axiosInstance({
        url: "/order/createorder",
        method: "POST",
        data: cartData,
      });

      // Clear cart data
      localStorage.removeItem("cartData");
      await axiosInstance.post("/cart/clear");

      toast.success("Order placed successfully!");

      // Redirect to order page or home
      navigate("/order");
    } catch (error) {
      console.log("Error processing order:", error);
    }
  };

  useEffect(() => {
    handlePaymentSuccess();
  }, []);

  return <div>Processing your order...</div>;
};
