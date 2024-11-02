import React, { useEffect } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { UserHeader } from "../components/user/UserHeader";
import { saveUser, clearUser } from "../redux/features/userSlice";

export const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userAuthorized = useSelector((state) => state.user.userAuthorized);
    console.log(userAuthorized,"==userauthorized");
  
    const checkUser = async () => {
        try {
            const response = await axiosInstance({ method: "GET", url: "/user/check-user",credentials:'include'});
            console.log(response, "====response");
            dispatch(saveUser(response?.data?.data));
        } catch (error) {
            console.log(error, "===error");
            dispatch(clearUser());
           
        }
    };

    useEffect(() => {
        checkUser();
    }, [location.pathname]);
    return (
        <div className="pt-3">
            {userAuthorized ? <UserHeader /> : <Header />}
            <div className="min-h-110">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
