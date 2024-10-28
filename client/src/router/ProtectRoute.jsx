import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectRoute = ({ role }) => {

    const userAuthorized = useSelector((state)=>state.auth.userAuthorized)
    const userRole = useSelector((state) => state.auth.role);

    console.log('userAutherized======',userAuthorized);
    
    const navigate = useNavigate();

     useEffect(() => {
        if (!userAuthorized) {
            navigate("/login");
        }
     else if (role && userRole !== role) {
        navigate("/unauthorized"); // Optional: create an unauthorized page
      }
     }, [userAuthorized, userRole, role, navigate]);

    return userAuthorized && (!role || userRole === role) ? <Outlet /> : null;
};
