import React from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { UserHeader } from "../components/user/UserHeader";
import { saveUser,clearUser} from "../redux/features/userSlice"
import {ProtectRoute } from "../router/ProtectRoute";
export const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userAuthorized = useSelector((state)=>state.user.userAuthorized)

        const checkUser = async () => {
            try {
                const response = await axiosInstance({ method: "GET", url: "/user/check-user" , withCredentials: true });
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
        <div className="pt-3 ">
             {userAuthorized ? <UserHeader /> : <Header />}
            
            <div className="min-h-110">
                <Outlet />

            </div>
            <Footer />
        </div>
    );
    };