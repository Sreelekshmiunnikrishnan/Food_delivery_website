import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { CardPlacehoderSkeleton } from '../../components/shared/Skeleton';
import { Input, Button, Card, Typography } from "@material-tailwind/react";
export const EditProfile = () => {
  const [userProfile,isLoading]=useFetch('/user/profile')
  const { register, handleSubmit,formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  console.log('userProfile====',userProfile);
if(isLoading){
 <CardPlacehoderSkeleton />
}

const onSubmit = async (data) => {
  try {
   
    const response = await axiosInstance({
      method: "POST",
      url: "/user/profile-update",
      data
    });
    console.log(response, '======response');
   toast.success("Profile updated successfully");
  
    navigate("/");
  } catch (error) {
    toast.error("Updation failed. Please try again.");
    console.error(error);
  }
}

  return (
    <div className="flex justify-center items-center pt-10  bg-gray-100">
      <Card className="w-300 p-6">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
         Edit Profile
        </Typography>
        
        <form className="mt-8 mb-2 w-120 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Your Name
              </label>
              <input type="text"{...register("name",{ required: "Name is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userProfile.name} />
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
                })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userProfile.email} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
              <textarea  {...register("address",{ required: "Address is required" })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userProfile.address} />
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
                })} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userProfile.phoneNumber} />
                 {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                 </div>
            
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary">Edit</button>

          </div>

         
        </form>
      </Card>
    </div>
  )
}
