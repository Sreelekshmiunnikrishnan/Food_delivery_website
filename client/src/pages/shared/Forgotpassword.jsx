import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";  // Import useForm
import { Card } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { axiosInstance } from "../../config/axiosInstance";

export const Forgotpassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
      const onSubmit =async (data) => {
        try {
            const response = await axiosInstance({
                method: "PATCH",
                url: "/user/updatepassword",
                data
              });
              console.log(response, '======response');
              if(response){
                toast.success('Password updated Successfully!');
                navigate("/");
              }
             
        } catch (error) {
            toast.error("Updation failed",error);
            console.error("Login error:", error); 
        }
        console.log(data);  // Handle the data (e.g., make API call)
      };
  return (
    <div className="flex justify-center items-center pt-10 pb-10 bg-gray-100">
    <Card className="w-300 p-6">
       <form className="mt-8 mb-2  max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 flex flex-col gap-6">

          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-lg text-gray">
              Email
            </label>
            <input type="email" {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-lg text-gray">
             New Password
            </label>
            <input type="password" {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password"   autoComplete="current-password"/>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-md text-gray">
                Confirm Password
              </label>
              <input type="password" {...register("conpass",{
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match"
                })} autoComplete="new-password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Re-enter Password" />
                {errors.conpass && <p className="text-red-500 text-sm">{errors.conpass.message}</p>}
            </div>
            
          
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary">
            Submit
          </button></div>
        <p className="flex justify-center mt-6 text-md text-blue">
        Cancel 
          <Link to="/login">
            Click here..
          </Link>
        </p>
      </form>
    </Card>
  </div>
  )
}
