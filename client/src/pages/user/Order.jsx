import React from 'react'
import { useState,useEffect } from 'react';

export const Order = () => {
const [food,setFood] = useState([]);
  // Payment success handler in the success URL page
const handleGetOrder = async () => {
  try {

    // Add items to order history
    const response = await axiosInstance({
      url: "/order/getorder",  // Endpoint to add items to order history
      method: "GET"
      
    });
    setFood(response);

    console.log("Order fetched successfully!");
  } catch (error) {
    console.log("Error adding order:", error);
  }
};

// In your success page component, call this on page load
useEffect(() => {
  handleGetOrder();
}, []);

  return (
    <div>OrderDetails...
      <p>Item Id: {food.items.menuId}</p>
      <p>Item name :{food.items.menuName}</p>
      <p>Item price :{food.items.price}</p>
      <p>Address :{food.tems.deliveryAddress}</p>
    </div>
  );
}
