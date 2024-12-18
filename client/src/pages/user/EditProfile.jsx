import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Card, Typography, Spinner } from "@material-tailwind/react";

export const EditProfile = () => {
  const [profile, setProfile] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({method:"GET",
        url:"/user/profile"});

      setProfile(response.data);
      setValue("name", response.data.user.name);
    setValue("email", response.data.user.email);
    //setValue("role", response.data.user.role);
    setValue("address", response.data.user.address);
    setValue("phoneNumber", response.data.user.phoneNumber);
    console.log("response===",response);
       
      setIsLoading(false);
   
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
     const response = await axiosInstance({
      method: "PUT",
      url:"/user/profile-update",
      data  });
      if(response){
      
      toast.success("Profile updated successfully");
      }
      navigate("/user/profile");
    } catch (error) {
      toast.error("Update failed. Email already exists");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

 if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-10">
        <Spinner />
      </div>
    );
  } 
  
  return (
  <div className="flex justify-center items-center bg-gray-100 min-h-screen">
    {isLoading ? (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    ) : (
      <Card className="w-300 p-4 mb-15">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
          Edit Profile
        </Typography>
        <form className="mt-8 mb-2 w-120 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-md text-slate-600">Your Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-blue rounded-md px-3 py-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
                className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-blue rounded-md px-3 py-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            {/* <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="role" className="block mb-2 text-sm text-slate-600">Choose your role:</label>
              <select
                className="w-full bg-transparent text-slate-700 text-sm border border-blue-gray-300 rounded-md px-3 py-2"
                id="role"
                {...register("role", { required: "Role is required" })}
              >
                <option value="">--Select--</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="restaurantOwner">Restaurant Owner</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div> */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Address</label>
              <textarea
                {...register("address", { required: "Address is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-blue rounded-md px-3 py-2"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-blue rounded-md px-3 py-2"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </Card>
    )}
  </div>
);

  
};
