import React from 'react'
import  { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

import { Card, Typography, Spinner } from "@material-tailwind/react";
export const DeleteProfiles = () => {
    const navigate = useNavigate();

    const deleteProfile = async () => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/owner/profile-delete"
            });
         if(response){
            // Show a success toast message
            toast.success("Profile deactivated..");

            // Redirect to login page
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Wait for 2 seconds to let the toast display
         }
           

        } catch (error) {
            console.log(error);
            toast.error("Failed to deactivate. Please try again.");
        }
    };
    useEffect(() => {
       deleteProfile();
      }, []);
  /* return(
    <div>
        Delete Profile
    </div>
  ) */
}
