import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Card, Typography, Button } from "@material-tailwind/react";
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
    <div className="w-2/3 h-auto p-6">
    <Typography variant="h4" color="deep-orange" className="mb-4 text-center">
      Order Details
    </Typography>

    {products.length > 0 ? (
      products.map((order, orderIndex) => (
        <Card key={orderIndex} className="mb-6 p-4 shadow-lg">
          <div className="mb-4">
            <Typography variant="h5" color="light-green" className="font-semibold">
              Order ID: {order.orderId}
            </Typography>
            <Typography color="light-green" className="mb-1">
              <strong>User ID:</strong> {order.userId}
            </Typography>
            <Typography color="light-green" className="mb-1">
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography color="light-green" className="mb-1">
              <strong>Total Quantity:</strong> {order.quantity}
            </Typography>
          </div>

          <Typography variant="h6" color="deep-orange" className="mt-2 mb-3">
            Items:
          </Typography>

          {order.items && order.items.length > 0 ? (
            order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-3 ml-6">
                <Typography color="light-green">
                  <strong>Menu Name:</strong> {item.menuName}
                </Typography>
                <Typography color="light-green">
                  <strong>Price:</strong> ₹{item.price.toFixed(2)}
                </Typography>
              </div>
            ))
          ) : (
            <Typography color="red">No items found for this order.</Typography>
          )}
          <Button color="blue" size="sm" className="mt-3">View More</Button>
        </Card>
      ))
    ) : (
      <Typography color="red">No orders found.</Typography>
    )}
   {/* Link to add a review for each specific order */}
  {/*  <Link to={`/order/${order.orderId}`}>
                        <button className="btn btn-primary mt-3" onClick={addreview}>
                            ADD REVIEW
                        </button>
                    </Link> */}
  </div>
  );
};
