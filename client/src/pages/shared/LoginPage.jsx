import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';

import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { axiosInstance } from "../../config/axiosInstance";

export const LoginPage = ({ role = "user" }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = {
    role: "user",
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
  };
  if (role === "restaurantOwner") {
    user.role = "restaurantOwner";
    user.login_api = "/owner/login";
    user.profile_route = "/owner/owner-profile";
    user.signup_route = "/signup";
  }
  else if (role === "admin") {
    (user.login_api = "/admin/login");
    (user.profile_route = "/admin/admin-profile");
    (user.signup_route = "/signup");

  }


  const onSubmit = async (data) => {
    try {
  const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data
      });
      console.log(response, "====response");
      toast.success("Login success");
 
      //dispatch(login({ role: user.role }));
      navigate(user.profile_route,{ replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  }
return (
    <div className="flex justify-center items-center pt-10  bg-gray-100">
      <Card className="w-300 p-6">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
          Login
        </Typography>
        <p className="text-slate-500 font-light">
          Nice to meet you {role}! Enter your details to login.
        </p>
        <form className="mt-8 mb-2  max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Email
              </label>
              <input type="email" {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email"
                }
              })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input type="password" {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })} required className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Password"   autoComplete="current-password"/>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary">
              Login
            </button></div>
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <Link to={user.signup_route}>
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

