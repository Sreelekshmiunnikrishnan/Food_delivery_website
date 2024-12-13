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
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    if (!orderId) return;  // Ensure orderId is defined
    try {
      const response = await axiosInstance.get(`/order/getorderbyid/${orderId}/${itemId}`);
      setItem(response.data);
      
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
        name: item?.menuName, 
        ...data
      });
      
      toast.success("Review added successfully");
      navigate("/user/review");
    } catch (error) {
      toast.error("You have already added review for this Item",error.message);
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId,itemId]);  // Run fetchOrder when orderId changes

  return (
    <div className="flex justify-center items-center pt-8 bg-gray-100 min-h-screen">
  <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
    <Typography variant="h4" color="indigo" className="mb-6 text-center">
      Review
    </Typography>
    <p className="text-slate-500 font-light text-center mb-4">Your reviews make us better.</p>

    <form className="mt-6 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        {/* Order ID */}
        <div className="w-full">
          <label className="block mb-2 text-md font-bold text-gray">Order ID</label>
          <input
            type="text"
            className="w-full bg-gray-50 text-slate-700 border border-gray-300 rounded-md px-4 py-2"
            value={orderId}
            readOnly
          />
        </div>

        {/* Menu Name */}
        <div className="w-full">
          <label className="block mb-2 text-md font-bold text-gray">Menu Name</label>
          <input
            type="text"
            className="w-full bg-gray-50 text-slate-700 border border-gray-300 rounded-md px-4 py-2"
            value={item?.menuName}
            readOnly
          />
          {errors.menuName && <p className="text-red-500 text-sm">{errors.menuName.message}</p>}
        </div>

        {/* Rating */}
        <div className="w-full">
          <label className="block mb-2 text-md font-bold text-gray">Rating</label>
          <input
            type="number"
            {...register("rating", { required: "Rating is required", min: 1, max: 5 })}
            className="w-full bg-gray-50 text-slate-700 border border-gray-300 rounded-md px-4 py-2"
            placeholder="Rating"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Comments */}
        <div className="w-full">
          <label className="block mb-2 text-md font-bold text-gray">Comments</label>
          <textarea
            {...register("comment", { required: "Comment is required" })}
            className="w-full bg-gray-50 text-slate-700 border border-gray-300 rounded-md px-4 py-2"
            placeholder="Enter comment"
          />
          {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
        </div>

        {/* Submit Button */}
        <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300">
          Submit
        </button>
      </div>
    </form>
  </Card>
</div>

  );
};
