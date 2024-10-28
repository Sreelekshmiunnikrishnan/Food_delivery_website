import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import { axiosInstance } from '../../config/axiosInstance';

export const Logouts = () => {
    const navigate = useNavigate();

    const log = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/owner/logout"
            });
         if(response){
            // Show a success toast message
            toast.success("Logout Successful");
      alert("logout success");
            // Redirect to login page
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Wait for 2 seconds to let the toast display
         }
           

        } catch (error) {
            console.log(error);
            toast.error("Failed to log out. Please try again.");
        }
    };

    useEffect(() => {
        log();
    }, []);

    return (
        <div>
            <ToastContainer /> {/* Toast container for displaying notifications */}
            Logging out...
        </div>
    );
};



