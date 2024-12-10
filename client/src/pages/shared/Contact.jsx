import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
export const Contact = () => {
    const { register, handleSubmit,formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      
      toast.success("Thank you for your valuable feedback");
     
      navigate("/");
    } catch (error) {
      toast.error("Internal server error");
      console.error(error);
    }
}
  return (
    <div className="flex justify-center items-center pt-10  bg-gray-100">
    <Card className="w-300 p-6">
      <Typography variant="h4" color="indigo" className="mb-4 text-center">
      Contact Us
      </Typography>
    <p className="text-yellow font-bold">
      <marquee>
      We are here to help you!!
      </marquee>
     
    </p>
    <form className="mt-8 mb-2  max-w-screen-lg sm:w-96"  onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1 flex flex-col gap-6">
      <div className="w-full max-w-sm min-w-[100px]">
              <label className="block mb-2 text-lg text-gray">
                Your Name
              </label>
              <input type="text"{...register("name")} className="w-full bg-transparent placeholder:text-gray text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Name" />
            </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-lg text-gray">
            Email
          </label>
          <input type="email" {...register("email")} required  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-lg text-gray">
           Phone Number
          </label>
          <input type="textl" {...register("phoneNumber")} required  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Phone Number" />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-lg text-gray">
                Your Concern
              </label>
              <textarea  {...register("messages")} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here.." />
            </div>
      </div>
      <div className="flex justify-center">
      <button className="btn btn-primary">
      Submit Your Feedback
      </button></div>
     
    </form>
    </Card>
  </div>
  )
}
