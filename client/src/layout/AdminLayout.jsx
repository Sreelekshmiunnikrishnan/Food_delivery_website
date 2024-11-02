import React from 'react'
import { useNavigate,useLocation  } from 'react-router-dom';
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance';
import {AdminHeader} from "../components/admin/AdminHeader";

import { login, logout } from '../redux/features/authSlice';
import { saveAdmin } from '../redux/features/adminSlice';

export const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const adminAuthorized = useSelector((state) => state.admin.isAdminAuthorized);
  console.log(adminAuthorized);
  
  const checkAdmin = async () => {
    try {
        const response = await axiosInstance({ method: "GET", url: "/admin/check-admin",credentials:'include'});
        console.log(response, "====response");
        dispatch(saveAdmin(response?.data?.data));
    } catch (error) {
        console.log(error, "===error");
        dispatch(clearAdmin());
        
    }
};

useEffect(() => {
  console.log("Checking admin authorization...");
  checkAdmin();
}, [location.pathname]);

 /* if (adminAuthorized === undefined) {
  return <div>Loading...</div>;
}  */
  return (
    <div className="pt-3 ">
           {adminAuthorized ? <AdminHeader /> : <Header />}
            
            <div className="min-h-110">
                <Outlet />

            </div>
            <Footer />
        </div>
  )
}
