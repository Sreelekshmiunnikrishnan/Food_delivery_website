import React,{useEffect,useState} from 'react'
import { axiosInstance } from "../../config/axiosInstance";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom'; 
import toast from 'react-hot-toast';
export const EditRestaurant = () => {

    const { id } = useParams(); 
    const navigate= useNavigate();
    const [restaurant, setRestaurant] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editRestaurant, setEditRestaurant] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cuisineType: '',
        phoneNumber: '',
        rating: '',
        ownerEmail: ''
    });
    
    
    const fetchRestaurant = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/restaurant/getRestaurant/${id}`
            });
            setRestaurant(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load restaurants.");
        } finally {
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
                url: `/restaurant/updateRestaurant/${restaurant?._id}`,
                data: formData
            });
            // Refresh the restaurant list after update
            fetchRestaurant();
           navigate("/owner/myrestaurants");
            //setEditRestaurant(null); // Clear the edit form
        } catch (error) {
            console.error("Failed to update restaurant:", error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: `/restaurant/deleteRestaurant/${id}`
            });
            // Refresh the restaurant list after deletion
            fetchRestaurant();
        } catch (error) {
            console.error("Failed to delete restaurant:", error);
            toast.error("Failed to delete restaurant:");
        }
    };


    useEffect(() => {
        fetchRestaurant();
        if (editRestaurant) {
            setFormData({
                name: restaurant.name,
                address: restaurant.address,
                cuisineType: restaurant.cuisineType,
                phoneNumber: restaurant.phoneNumber,
                rating: restaurant.rating,
                ownerEmail: restaurant.ownerEmail,
            });
        }
    }, [editRestaurant]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 mt-20">
    <h2 className="text-2xl font-semibold text-center mb-6">Edit Restaurant</h2>
    <form 
        onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}
        className="flex flex-col gap-4"
    >
        <input 
            name="name" 
            value={formData.name} 
            onChange={handleFormChange} 
            placeholder="Name" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="address" 
            value={formData.address} 
            onChange={handleFormChange} 
            placeholder="Address" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="cuisineType" 
            value={formData.cuisineType} 
            onChange={handleFormChange} 
            placeholder="Cuisine Type" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleFormChange} 
            placeholder="Phone Number" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="rating" 
            value={formData.rating} 
            onChange={handleFormChange} 
            placeholder="Rating" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
            name="ownerEmail" 
            value={formData.ownerEmail} 
            onChange={handleFormChange} 
            placeholder="Owner Email" 
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
                onClick={() => setEditRestaurant(null)}
            >
                Cancel
            </button>
        </div>
    </form>
</div>

  )
}
