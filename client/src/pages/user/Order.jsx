import React from 'react'
import { useState,useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
export const Order = () => {
const [products,setProducts] = useState([]);
  // Payment success handler in the success URL page
const handleGetOrder = async () => {
  try {

    // Add items to order history
    const response = await axiosInstance({
      url: "/order/getorders",  // Endpoint to add items to order history
      method: "GET"
      
    });
    if(response){
    setProducts(response.data);
     console.log(products);
     console.log("Order fetched successfully!");
    
    }
     else{
      console.log("error fetching order details")
     }

  } catch (error) {
    console.log("Error adding order:", error);
  }
};

// In your success page component, call this on page load
useEffect(() => {
  handleGetOrder();
}, []);

  return (
    <div className="w-full h-40">
      <h2>Order Details</h2>
      {/* <p><strong>User ID:</strong> {products.order.userId}</p>
        <p><strong>Owner ID:</strong> {products.order.ownerId}</p>
       <p><strong>Status:</strong> {products.order.status}</p>
      <p><strong>Owner ID:</strong> {food.data.ownerId}</p>
      <p><strong>Menu Name:</strong> {products.order.items.menuName}</p>
     <p><strong>Quantity:</strong> {products.order.quantity}</p>
     <p><strong>Price:</strong> {products.order.items.price}</p>    */}
     
    </div>
  );
}
