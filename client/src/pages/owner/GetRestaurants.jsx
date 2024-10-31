import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
export const GetRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    /* const [editRestaurant, setEditRestaurant] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cuisineType: '',
        phoneNumber: '',
        rating: '',
        ownerEmail: ''
    }); */

    const fetchRestaurants = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/restaurant/getAllrestaurants"
            });
            setRestaurants(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load restaurants.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: `/restaurant/deleteRestaurant/${id}`
            });
            // Refresh the restaurant list after deletion
            fetchRestaurants();
        } catch (error) {
            console.error("Failed to delete restaurant:", error);
        }
    };

    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center pt-10">
                <Spinner />
            </div>
        );
    }

    return (
        <div className='pt-15'> 
            <Card className="h-full w-full p-8 overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Name</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Address</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Cuisine Type</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Phone Number</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Rating</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Owner Email</Typography></th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"><Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Actions</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant._id} className="even:bg-blue-gray-50/50">
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.name}</Typography></td>
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.address}</Typography></td>
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.cuisineType}</Typography></td>
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.phoneNumber}</Typography></td>
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.rating}</Typography></td>
                                <td className="p-4"><Typography variant="small" color="blue-gray" className="font-normal">{restaurant.ownerEmail}</Typography></td>
                               {/*  <td className="p-4">
                                <Link to={`/owner/editRestaurant/${restaurant._id}`}>
                                    <Button color="yellow">Edit</Button></Link>
                                    <Button color="red" onClick={() => handleDelete(restaurant._id)}>Delete</Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* {editRestaurant && (
                <div className="modal">
                    <h2>Edit Restaurant</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" />
                        <input name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" />
                        <input name="cuisineType" value={formData.cuisineType} onChange={handleFormChange} placeholder="Cuisine Type" />
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} placeholder="Phone Number" />
                        <input name="rating" value={formData.rating} onChange={handleFormChange} placeholder="Rating" />
                        <input name="ownerEmail" value={formData.ownerEmail} onChange={handleFormChange} placeholder="Owner Email" />
                        <button type="submit">Update</button>
                    </form>
                    <button onClick={() => setEditRestaurant(null)}>Cancel</button>
                </div>
            )} */}
        </div>
    );
}
