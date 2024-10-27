import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectRoute = () => {

    const userAuthorized = useSelector((state)=>state.user.userAuthorized)
 
    console.log('userAutherized======',userAuthorized);
    
    const navigate = useNavigate();

    // useEffect(() => {
        if (!userAuthorized) {
            navigate("/login");
        }
    // }, []);

    return userAuthorized && <Outlet />;
};
