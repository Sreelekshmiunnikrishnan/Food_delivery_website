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
        <div className="ml-100">
            <Card className="w-1/3 h-6/12 ml-80 items-center bg-gray">
                <h1 className="text-white font-bold">Payment successful!</h1>
                <h1 className="text-yellow font-semibold">Products</h1>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index}>
                            <p className="text-white font-bold">Name: {product.price_data.product_data.name}</p>
                            <p className="text-white font-bold">Currency: {product.price_data.currency.toUpperCase()}</p>
                            <p className="text-white font-bold">Price: ₹{product.price_data.unit_amount / 100}</p>
                            <p className="text-white font-bold">Quantity: {product.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No products found.</p>
                )}
                <Link to="/user/order">
                    <button className="btn btn-primary mt-4">View Order Details</button>
                </Link>
            </Card>
        </div>
    );
};
