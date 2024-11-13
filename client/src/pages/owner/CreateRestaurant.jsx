import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import { Card, Typography, Spinner } from "@material-tailwind/react";
import toast from 'react-hot-toast';
export const CreateRestaurant = () => {
  const { register, handleSubmit,formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  
    const onSubmit = async (data) => {
    try {
      
      const response = await axiosInstance({
        method: "POST",
        url: "/restaurant/create",
        data
      });
      console.log(response, '======response');
     toast.success("Restaurant created");
   
      navigate("/owner/owner-profile");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      
      console.error(error);
    }
   


  }
  return (
    <div className="flex justify-center items-center pt-10  bg-gray-100">
    <Card className="w-300 p-6">
      <Typography variant="h4" color="indigo" className="mb-4 text-center">
       Restaurant
      </Typography>
      <p className="text-yellow font-light">
       Welcome ! Enter  details to create restaurant.
      </p>
      <form className="mt-8 mb-2 w-120 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2">
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Your Name
            </label>
            <input type="text"{...register("name",{ required: "Name is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Restaurant Name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} {/* Error message */}
          </div>
          
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Email
            </label>
            <input type="email" {...register("ownerEmail",{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email"
                }
              })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Owner Email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          
           <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="cuisineType">Choose cuisine type:</label>
              <select className="border border-blue rounded-md" id="cuisineType" {...register("cuisineType", { required: "cuisine  is required" })}>
                <option value="">--Select--</option>
                <option value="arabic">Arabic</option>
              <option value="continental">Continental</option>
                <option value="indian">Indian</option>
                 <option value="thai">Thai</option>
              </select>
              {errors.cuisineType && <p className="text-red-500 text-sm">{errors.cuisineType.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Address
            </label>
            <textarea  {...register("address",{ required: "Address is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter address" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Phone Number
            </label>
            <input type="text" {...register("phoneNumber",{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Mobile no" />
               {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
               </div>
               <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Rating
            </label>
               <input type="number" {...register("rating",{
                required: "Rating is required",
                pattern: {
                  value: /[0-5]/,
                  message: "Please enter rating"
                }
              })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Rating" />
               {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
               </div>
          
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary">Create</button>

        </div>

        <p className="flex justify-center mt-6 text-sm text-slate-600">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </Card>
  </div>
)
}
  

