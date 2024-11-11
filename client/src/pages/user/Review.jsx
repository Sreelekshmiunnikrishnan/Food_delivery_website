import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate,useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

//import { useDispatch } from "react-redux";
//import { login } from "../../redux/features/authSlice";
import { axiosInstance } from "../../config/axiosInstance";
import toast from 'react-hot-toast';
export const Review = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    
  const navigate = useNavigate();
  const { itemId } = useParams(); 
    const onSubmit = async (data) => {
        try {
          
    
    const response = await axiosInstance({
            method: "POST",
            url: "/review/addreview",
            data
          });
          console.log(response, "====response");
          toast.success("Review added successfully");
       
          //dispatch(login({ role: user.role }));
          navigate("/user/profile");
        
       
        } catch (error) {
        toast.error("Failed to add review.Buy item to add review");
        
          console.log(error);
        }
      }
  return (
    <div className="flex justify-center items-center pt-10  bg-gray-100">
      <Card className="w-300 p-6">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
        Review
        </Typography>
        <p className="text-slate-500 font-light">
          Your reviews make us better..
        </p>
        <form className="mt-8 mb-2  max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">
          <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
               MenuName
              </label>
              <input type="text" {...register("menuName", {
                required: "MenuName is required",
              
              })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Menu Name" />
              {errors.menuName && <p className="text-red-500 text-sm">{errors.menuName.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Rating
              </label>
              <input type="number" {...register("rating", {
                required: "Rating is required",
                pattern: {
                  value:  /^[1-5]{1}$/,
                  message: "Please enter a valid rating between 1-5"
                }
              })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Rating" />
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Comments
              </label>
              <textarea  {...register("comment",{ required: "Comment is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter comment" />
              {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
             </div>
             <button className="btn btn-primary">
             Submit
            </button>
          </div>
         
           
          
        </form>
      </Card>
    </div>
  )
}
