import React from 'react'
import { useNavigate,useLocation  } from 'react-router-dom';
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance';
import {AdminHeader} from "../components/admin/AdminHeader";
import { clearAdmin, saveAdmin } from '../redux/features/adminSlice';

export const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const adminAuthorized = useSelector((state)=>state.admin.adminAuthorized)

  const checkAdmin = async () => {
    try {
        const response = await axiosInstance({ method: "GET", url: "/admin/check-admin" });
        console.log(response, "====response");
        dispatch(saveAdmin(response?.data?.data));
    } catch (error) {
        console.log(error, "===error");
        dispatch(clearAdmin());
    }
};

useEffect(() => {
    checkAdmin();
}, [location.pathname]);
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
