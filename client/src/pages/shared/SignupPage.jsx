import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

import { Input, Button, Card, Typography } from "@material-tailwind/react";
export const SignupPage = () => {
  const { register, handleSubmit,formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  
    const onSubmit = async (data) => {
    try {
      let signupRoute = '/user/signup'; // Default

      if (data.role === "admin") {
        signupRoute = '/admin/signup';
      } else if (data.role === "restaurantOwner") {
        signupRoute = '/owner/signup';
      }
      const response = await axiosInstance({
        method: "POST",
        url: signupRoute,
        data
      });
      console.log(response, '======response');
     
    alert("Signup success")
      navigate("/");
    } catch (error) {
     
      alert("Signup failed. Please try again.")
      console.error(error);
    }
   


  }
  return (


    <div className="flex justify-center items-center pt-10  bg-gray-100">
      <Card className="w-300 p-6">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
          Sign Up
        </Typography>
        <p className="text-yellow font-light">
          Nice to meet you ! Enter your details to register.
        </p>
        <form className="mt-8 mb-2 w-120 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Your Name
              </label>
              <input type="text"{...register("name",{ required: "Name is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} {/* Error message */}
            </div>
            
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Email
              </label>
              <input type="email" {...register("email",{
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email"
                  }
                })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input type="password" autoComplete="new-password" {...register("password",{ 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Confirm Password
              </label>
              <input type="password" {...register("conpass",{
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match"
                })} autoComplete="new-password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Re-enter Password" />
                {errors.conpass && <p className="text-red-500 text-sm">{errors.conpass.message}</p>}
            </div>
            
            <div className="w-full max-w-sm min-w-[200px]">
                <label htmlFor="role">Choose your role:</label>
                <select className="border border-blue rounded-md" id="role" {...register("role", { required: "Role is required" })}>
                  <option value="">--Select--</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="restaurantOwner">Restaurant Owner</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
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
            
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary">Sign Up</button>

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