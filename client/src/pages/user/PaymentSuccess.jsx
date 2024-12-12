import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useSearchParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";

export const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderCreated, setOrderCreated] = useState(false); // Track if order is created
    const sessionId = searchParams.get("session_id");

    // Fetch session details when component mounts
    const fetchSessionDetails = async () => {
        if (!sessionId) {
            setError("Session ID is missing. Unable to retrieve payment details.");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/payment/sessionstatus?session_id=${sessionId}`);
            setProducts(response.data.products);
            console.log("Products from session:", response.data.products);
        } catch (error) {
            console.error("Error retrieving session details:", error);
            setError("Failed to retrieve session details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Move to order creation after products are loaded
    const moveToOrder = async (products) => {
        if (!products || products.length === 0 || orderCreated) {
            console.error("No products available to create an order or order already created.");
            return;
        }

        const orderData = {
            items: products.map(product => ({
                quantity: product.quantity,
                menuName: product.price_data.product_data.name,
                price: (product.price_data.unit_amount / 100) * product.quantity,
                
            })),
            orderId: sessionId,
        };
        console.log("Order Data:", orderData);
       
       
        try {
            const response = await axiosInstance.post("/order/createorder", { orderData });
            console.log("Order created successfully:", response.data);
            setOrderCreated(true); // Mark order as created
        } catch (error) {
            console.error("Error creating order:", error);
            setError("Failed to create the order. Please try again.");
        }
    };

    useEffect(() => {
        fetchSessionDetails();
    }, [sessionId]);

    useEffect(() => {
        if (products.length > 0 && !orderCreated) {
            moveToOrder(products);
        }
    }, [products, orderCreated]);

    if (loading) {
        return <p>Loading payment details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex justify-center items-center pb-10 px-4">
        <Card className="w-full max-w-lg h-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-green font-bold text-xl text-center">Payment Successful!</h1>
          <h1 className="text-yellow font-semibold text-lg text-center mt-4">Products</h1>
          {products.length > 0 ? (
            <div className="mt-4 space-y-4">
              {products.map((product, index) => (
                <div key={index} className="text-gray space-y-2">
                  <p className="font-bold">Name: {product.price_data.product_data.name}</p>
                  
                  <p className="font-bold">Price: ₹{product.price_data.unit_amount / 100}</p>
                  <p className="font-bold">Quantity: {product.quantity}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white mt-4 text-center">No products found.</p>
          )}
          <Link to="/user/order">
            <button className="btn btn-primary mt-6 w-full">View Order Details</button>
          </Link>
        </Card>
      </div>
      
    );
};
