import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
   /*  const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [sessionId, setSessionId] = useState(null);

    const handlePaymentSuccess = async () => {
        try {
            // Retrieve menus and sessionId from local storage
            const storedMenus = localStorage.getItem('cartMenus');
            const storedSessionId = localStorage.getItem('sessionId');

            // Parse stored menus if available
            if (storedMenus) {
                setMenus(JSON.parse(storedMenus)); // Parse the JSON string back into an array
            }

            // Store the sessionId if available
            if (storedSessionId) {
                setSessionId(storedSessionId);
            }

            // Proceed with creating the order
            if (menus.length > 0 && sessionId) {
                const response = await axiosInstance({
                    url: "/order/createorder",
                    method: "POST",
                    data: { menus, sessionId },
                });

                if (response) {
                    console.log("Order placed successfully!");
                    alert("Order placed successfully!");
                    // Clear localStorage after successful order placement
                    localStorage.removeItem('cartMenus');
                    localStorage.removeItem('sessionId');
                    navigate("/user/order");
                }
            } else {
                alert("No order data found. Please try again.");
            }
        } catch (error) {
            console.error("Error processing order:", error);
            alert("Error processing order. Please try again.");
        }
    };

    useEffect(() => {
        handlePaymentSuccess();
    }, []); */

    return (
        <div>
            <h1>Payment Successful!</h1>
            
        </div> 
    );
};
