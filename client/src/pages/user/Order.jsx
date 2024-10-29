import React from 'react'
import { useState,useEffect } from 'react';

export const Order = () => {
const [item,setItem] = useState([]);
  // Payment success handler in the success URL page
const handleGetOrder = async () => {
  try {

    // Add items to order history
    const response = await axiosInstance({
      url: "/order/getorder",  // Endpoint to add items to order history
      method: "GET",
      
    });
    setItem(response);

    console.log("Order placed successfully!");
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
      <p>Item Id: {item.menus.menuId}</p>
      <p>Item name :{item.menus.menuName}</p>
      <p>Item totalprice :{item.totalPrices}</p>
      <p>Address :{item.deliveryAddress}</p>
    </div>
  );
}
