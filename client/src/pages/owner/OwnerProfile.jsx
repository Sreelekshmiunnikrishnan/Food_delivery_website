
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
export const OwnerProfile = () => {
  const [profile, setProfile] = useState([]);
 const [isLoading,setIsLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({method:"GET",
        url:"/owner/owner-profile"});

      setProfile(response.data);
    
       console.log("response===",response);
       
      setIsLoading(false);
   
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="flex flex-wrap justify-center">
      <div key={profile._id} className="card card-compact bg-base-100 w-96 shadow-xl m-4">
       
        <div className="card-body">
          <h2 className="card-title">Name: {profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>PhoneNumber: {profile.phoneNumber}</p>
          
        </div>
        
                
      </div>
    </div>
  )
}
