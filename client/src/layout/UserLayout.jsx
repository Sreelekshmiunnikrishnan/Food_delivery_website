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
import { login, logout } from "../redux/features/authSlice";
export const UserLayout = ({role}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userAuthorized = useSelector((state) => state.auth.userAuthorized);

        const checkUser = async () => {
            try {

                const response = await axiosInstance({ method: "GET", url: "/user/check-user", credentials: 'include' 
               
                 });
                console.log(response, "====response");
                dispatch(login(response?.data?.data));
            } catch (error) {
                console.log(error, "===error");
                dispatch(logout());
            }
        };
    
        useEffect(() => {
            checkUser();
        }, []);
    
        if (userAuthorized === undefined) {
            return <div>Loading...</div>;
        }
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
