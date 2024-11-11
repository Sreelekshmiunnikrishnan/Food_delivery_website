import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectRoute = () => {
    // Accessing authorization states from the slices
    const userAuthorized = useSelector((state) => state.user.userAuthorized);
    const adminAuthorized = useSelector((state) => state.admin.isAdminAuthorized);
    const ownerAuthorized = useSelector((state) => state.owner.isOwnerAuthorized);

    const navigate = useNavigate();

   //useEffect(() => {
        // Check if any user role is authorized
        if (!userAuthorized && !adminAuthorized && !ownerAuthorized) {
            navigate("/login"); // Redirect to login if not authorized
        }
   // }, [userAuthorized, adminAuthorized, ownerAuthorized, navigate]);

    // Render the Outlet if any user is authorized
    return (userAuthorized || adminAuthorized || ownerAuthorized) ? <Outlet /> : null;
};
