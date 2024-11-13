import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Card, Typography, Spinner } from "@material-tailwind/react";
import React,{useState,useEffect} from "react";

export const EditProfilesUser = () => {
    const [profile, setProfile] = useState([]);
 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [editProfile, setEditProfile] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
       phoneNumber: '',
       role: '',
        email: ''
    });
    
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({method:"GET",
        url:"/user/profile"});

      setProfile(response.data);
    
       console.log("response===",response);
       
      setIsLoading(false);
   
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleUpdate = async () => {
    try {
        await axiosInstance({
            method: "PUT",
            url: "/user/profile-update",
            data: formData
        });
        // Refresh the restaurant list after update
        //fetchProfile();
       navigate("/profile");
        //setEditRestaurant(null); // Clear the edit form
    } catch (error) {
        console.error("Failed to update profile:", error);
    }
};
useEffect(() => {
    fetchProfile();
    if (editProfile) {
        setFormData({
            name: profile.user.name,
            address: profile.user.address,
            phoneNumber: profile.user.phoneNumber,
            role: profile.user.role,
            email:profile.user.email,
        });
    }
  }, [editProfile]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-10">
        <Spinner />
      </div>
    );
  } 
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 mt-20">
    <h2 className="text-2xl font-semibold text-center mb-6">Edit profile</h2>
    <form 
        onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}
        className="flex flex-col gap-4"
    >
        <input 
            name="name" 
            value={formData.name} 
           
            onChange={handleFormChange} 
            placeholder={profile.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="address" 
            value={formData.address} 
           
            onChange={handleFormChange} 
            placeholder={profile.address}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input 
            name="phoneNumber" 
            value={formData.phoneNumber} 
           
            onChange={handleFormChange} 
            placeholder={profile.phoneNumber} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="rating" 
            value={formData.role} 
           
            onChange={handleFormChange} 
            placeholder={profile.role}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="ownerEmail" 
            
            value={formData.email} 
            onChange={handleFormChange} 
            placeholder={profile.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <div className="flex justify-center items-center mt-4">
            <button 
                type="submit" 
                className="bg-green text-white align-center px-4 py-2 rounded-md hover:bg-blue-600"
               onClick={handleUpdate}
            >
                Update
            </button>
            
            <button 
                type="button" 
                className="text-gray-600 hover:text-gray-800 underline ml-4" 
                onClick={() => setEditProfile(null)}
            >
                Cancel
            </button>
        </div>
    </form>
</div>

  )
}

