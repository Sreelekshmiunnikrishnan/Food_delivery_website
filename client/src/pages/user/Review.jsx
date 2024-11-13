import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from 'react-hot-toast';

export const Review = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { orderId, itemId } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    if (!orderId) return;  // Ensure orderId is defined
    try {
      const response = await axiosInstance.get(`/order/getorderbyid/${orderId}`);
      setOrder(response.data);
      console.log("response ===", response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Could not fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/review/addreview", {
        itemId,
        orderId,
        ...data
      });
      console.log("Response ===", response);
      toast.success("Review added successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to add review. Buy item to add review");
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);  // Run fetchOrder when orderId changes

  return (
    <div className="flex justify-center items-center pt-2 bg-gray-100">
      <Card className="w-400">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
          Review
        </Typography>
        <p className="text-slate-500 font-light">Your reviews make us better.</p>
        
        <form className="mt-8 mb-2 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div key={index} className="mb-1 flex flex-col gap-6">
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">OrderId</label>
                  <input type="text" {...register("orderId", { required: "OrderId is required" })}
                    className="w-full bg-transparent text-slate-700 border rounded-md px-3 py-2"
                    value={orderId} readOnly />
                  {errors.orderId && <p className="text-red-500 text-sm">{errors.orderId.message}</p>}
                </div>
                
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Menu Name</label>
                  <input type="text" {...register("menuName", { required: "MenuName is required" })}
                    className="w-full bg-transparent text-slate-700 border rounded-md px-3 py-2"
                    value={item.menuName} readOnly />
                  {errors.menuName && <p className="text-red-500 text-sm">{errors.menuName.message}</p>}
                </div>

                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Rating</label>
                  <input type="number" {...register("rating", {
                    required: "Rating is required",
                    min: 1, max: 5
                  })} className="w-full bg-transparent text-slate-700 border rounded-md px-3 py-2" placeholder="Rating" />
                  {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                </div>

                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">Comments</label>
                  <textarea {...register("comment", { required: "Comment is required" })}
                    className="w-full bg-transparent text-slate-700 border rounded-md px-3 py-2" placeholder="Enter comment" />
                  {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                </div>

                <button className="btn btn-primary">Submit</button>
              </div>
            ))
          ) : (
            <Typography color="red">No items found for this order.</Typography>
          )}
        </form>
      </Card>
    </div>
  );
};
