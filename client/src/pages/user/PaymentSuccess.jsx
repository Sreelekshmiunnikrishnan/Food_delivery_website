import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";
export const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);
    const sessionId = searchParams.get("session_id"); 
    const navigate = useNavigate();
       const fetchSessionDetails = async () => {
       
        if (sessionId) {
            try {
                const response = await axiosInstance({
                    url:`/payment/sessionstatus?session_id=${sessionId}`,
                    method:"GET"
                });
                const  responseProduct =  response.data.products;
                console.log("Products:", responseProduct);
               setProducts(responseProduct);
             
               moveToOrder(products);
                
              
            } catch (error) {
                console.error("Error retrieving session details:", error);
                setError("Failed to retrieve session details. Please try again.");
            }
        }
    }; 
    
       
              const moveToOrder = async (products) => {
                /* if (!products || products.length === 0) {
                    console.error("No products available to create an order.");
                    return;
                } */
            
                const orderData = {
                    items: products.map(product => ({
                       
                        menuName: product.price_data.product_data.name,
                        price: product.price_data.unit_amount / 100,
                    })),
                    ownerId: sessionId, // Your payment intent identifier
                };
            
                try {
                    const response = await axiosInstance.post("/order/createorder", orderData);
                    console.log("Order created successfully:", response.data);
                } catch (error) {
                    console.error("Error creating order:", error);
                }
            };
            
    
    

      useEffect(() => {
       
        fetchSessionDetails();
    }, []);
  
    return (
        <div className="ml-100">
       
        <Card className="w-80 h-80  ml-80 items-center bg-gray ">
        <h1 className="text-white font-bold ">Payment successful..</h1>
        <h1 className="text-yellow font-semi-bold">Products</h1>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>
              <p className="text-white font-bold">Name: {product.price_data.product_data.name}</p>
              <p className="text-white font-bold">Currency: {product.price_data.currency}</p>
              <p className="text-white font-bold">Price: {product.price_data.unit_amount / 100}</p>
           
             
              <p className="text-white font-bold"> Quantity: {product.quantity}</p>
              <Link to={"/user/order"}>
                  <button className="btn btn-primary">Click to view Order details</button>
              </Link>
              
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}</Card>
    </div>
    );
};
