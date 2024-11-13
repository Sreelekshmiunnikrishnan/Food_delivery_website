import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
export const Mymenu = () => {
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMenus = async () => {
        try {
            const response = await axiosInstance.get('/menu/getOwnMenu');
            if(response){
            setMenus(response.data);
            }else{
                toast.error("You haven't created any menu yet..");
            } // Only owned restaurants should return here
        } catch (error) {
            setError("Failed to load menus.");
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: `/menu/deletemenu/${id}`
            });
            // Refresh the restaurant list after deletion
            fetchRestaurants();
        } catch (error) {
            console.error("Failed to delete restaurant:", error);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">My Menu</h2>
        {menus.map((menu) => (
            <Card key={menu._id} className="mb-4 p-4 w-full max-w-md">
                <h3 className="text-xl font-semibold text-center">{menu.name}</h3>
                <p className="text-center">Restaurant name: {menu.restaurantName}</p>
                <p className="text-center">Description: {menu.description}</p>
                <p className="text-center">Price: {menu.price}</p>
               
                <div className="flex justify-center mt-4 space-x-4">
                    <Link to={`/owner/editMenu/${menu._id}`}>
                        <Button className="bg-yellow text-white px-4 py-2 rounded-md">
                            Edit
                        </Button>
                    </Link>
                    <Button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md" 
                        onClick={() => handleDelete(menu._id)}
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        ))}
    </div>
    
    );
};
