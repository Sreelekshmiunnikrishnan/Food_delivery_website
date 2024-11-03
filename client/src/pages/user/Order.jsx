import React from 'react'
import { useState,useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
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
    if(response){
    setFood(response.data);
    console.log(food);
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
      <p><strong>User ID:</strong> {food.data.userId}</p>
       <p><strong>Status:</strong> {food.data.status}</p>
      <p><strong>Owner ID:</strong> {food.data.ownerId}</p>
      <p><strong>Menu Name:</strong> {food.data.items.menuName}</p>
     <p><strong>Quantity:</strong> {food.data.quantity}</p>
     <p><strong>Price:</strong> {food.data.items.price}</p> 
     {/*  <h3>Items:</h3>
      {food.data.items && food.data.items.length > 0 ? (
        <ul>
          {food.data.items.map((item, index) => (
            <li key={index}>
              <p><strong>Menu Name:</strong> {item.menuName}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> {item.price.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in this order.</p>
      )} */}
    </div>
  );
}
