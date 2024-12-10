
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
export const UserOrder = () => {
    const [products, setProducts] = useState([]);
    const handleStatusChange = async (orderId, status) => {
      try {
        // API call to update the order status in the backend
        const response = await axiosInstance({
          method: 'PATCH',
          url:`/order/${orderId}/${status}`,
          headers: {
            'Content-Type': 'application/json',
          },
          
        }
      );
    
        if (response) {
          // Update the local state or refetch orders to reflect the new status
          setProducts((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status } : order
            )
          );
         toast.success('Order status updated successfully.');
        } else {
          const error = await response.json();
          toast.error(`Failed to update status: ${error.message}`);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
       toast.error('An error occurred. Please try again.');
      }
    };
    
  // Fetch orders on page load
  const handleGetOrder = async () => {
    try {
      const response = await axiosInstance.get("/owner/getorders"); // Simplified axios request with GET method
      if (response && response.data) {
        setProducts(response.data);
        console.log("Orders fetched successfully:", response.data);
      } else {
        console.log("Error fetching order details");
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  return (
    <div className="w-2/3 h-auto ml-20">
    <Typography variant="h4" color="deep-orange" className="mb-4 text-center">
      Order Details
    </Typography>

    {products.length > 0 ? (
      products.map((order, orderIndex) => (
        <Card key={orderIndex} className="mb-6 p-4 shadow-lg bg-white">
          <div className="mb-4">
            <Typography variant="h5" color="amber" className="font-semibold">
              Order ID: {order.orderId}
            </Typography>
            <Typography color="amber" className="mb-1">
              <strong>User Email:</strong> {order.userEmail}
            </Typography>
            <Typography color="amber" className="mb-1">
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography color="amber" className="mb-1">
            <strong> Update Status:</strong>
            <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Preparing">Preparing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
            </Typography>
            <Typography color="amber" className="mb-1">
              <strong>Total Quantity:</strong> {order.quantity}
            </Typography>
          </div>

          <Typography variant="h6" color="deep-orange" className="mt-2 mb-3">
            Items:
          </Typography>

          {order.items && order.items.length > 0 ? (
            order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-3 ml-6">
                <Typography color="amber">
                  <strong>Menu Name:</strong> {item.menuName}
                </Typography>
               {/*  <Typography color="amber">
                  <strong>Menu Id:</strong> {item.menuId}
                </Typography> */}
                <Typography color="amber">
                  <strong>Price:</strong> ₹{item.price.toFixed(2)}
                </Typography>
                
              </div>
            ))
          ) : (
            <Typography color="red">No items found for this order.</Typography>
          )}
         
        </Card>
      ))
    ) : (
      <Typography color="red">No orders found.</Typography>
    )}
  
  </div>
  )
}
