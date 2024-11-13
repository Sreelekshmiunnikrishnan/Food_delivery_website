import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export const MyRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRestaurants = async () => {
        try {
            const response = await axiosInstance.get('/restaurant/getOwnRestaurant');
            if(response){
            setRestaurants(response.data); 
            }else{
                toast.error("You haven't created any restaurants yet..");
            }
        } catch (error) {
            setError("Failed to load restaurants.");
        } finally {
            setIsLoading(false);
        }
    };
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

    useEffect(() => {
        fetchRestaurants();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">My Restaurants</h2>
        {restaurants.map((restaurant) => (
            <Card key={restaurant._id} className="mb-4 p-4 w-full max-w-md">
                <h3 className="text-xl font-semibold text-center">{restaurant.name}</h3>
                <p className="text-center">Address: {restaurant.address}</p>
                <p className="text-center">Cuisine Type: {restaurant.cuisineType}</p>
                <p className="text-center">Rating: {restaurant.rating}</p>
                <p className="text-center">Phone number: {restaurant.phoneNumber}</p>
                <div className="flex justify-center mt-4 space-x-4">
                    <Link to={`/owner/editRestaurant/${restaurant._id}`}>
                        <Button className="bg-yellow text-white px-4 py-2 rounded-md">
                            Edit
                        </Button>
                    </Link>
                    <Button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md" 
                        onClick={() => handleDelete(restaurant._id)}
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        ))}
    </div>
    
    );
};
