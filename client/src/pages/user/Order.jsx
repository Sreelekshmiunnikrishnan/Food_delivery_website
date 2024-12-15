import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export const Order = () => {
  const [products, setProducts] = useState([]);
  
  // Fetch orders on page load
  const handleGetOrder = async () => {
    try {
      const response = await axiosInstance.get("/order/getorders"); // Simplified axios request with GET method
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
            <Typography variant="h6" color="light-green" className="font-semibold">
              Order ID: {order.orderId}
            </Typography>
            <Typography variant="small" color="gray" className="mb-1">
              <strong>User Email:</strong> {order.userEmail}
            </Typography>
            <Typography variant="small" color="gray" className="mb-1">
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography variant="small" color="gray-200" className="mb-1">
              <strong>Total Quantity:</strong> {order.quantity}
            </Typography>
          </div>

          <Typography variant="h5" color="red" className="mt-2 mb-3">
            Items:
          </Typography>

          {order.items && order.items.length > 0 ? (
            order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-3 ml-6">
                <Typography variant="small" color="gray">
                  <strong>Menu Name:</strong> {item.menuName}
                </Typography>
                   {/*  <Typography color="light-green">
                  <strong>Menu Id:</strong> {item.menuId}
                </Typography>     */}
                <Typography variant="small" color="gray">
                  <strong>Price:</strong> ₹{item.price.toFixed(2)}
                </Typography>
                 {/* Link to add a review for each specific order */}
                 <Link to={`/user/review/${order._id}/${item._id}`}>
                 <Button  size="sm" className="mt-3 bg-yellow text-white">
                            ADD REVIEW
                        </Button>
                    </Link> 
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
  );
};
