import React, { useEffect, useState } from 'react'
import { axiosInstance } from "../../config/axiosInstance";
import { RestaurantCard } from '../../components/user/Card';
import { Card, Typography } from "@material-tailwind/react";
//import { CardPlacehoderSkeleton } from '../../components/shared/Skeleton';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurant/getAllrestaurants"
      });

      setRestaurants(response.data);
      console.log("response===", response);

    } catch (error) {
      console.log(error);
      //toast.error("Failed to load restaurants.")
      //setError("Failed to load restaurants.");
    }

  };
  useEffect(() => {
    fetchRestaurants();
  }, []);
    /* if(isLoading) {
      return (
        <div className="flex justify-center items-center pt-10">
          <Spinner />
        </div>
      );
    }else{
   */
    return (
      <div className="pt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {restaurants.map((restaurant) => (
      <Card key={restaurant._id} className="p-6 shadow-lg">
      <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
       <Link to={`/restaurants/${restaurant._id}`} className="hover:underline">
              {restaurant.name}
            </Link>
            </Typography>
      <Typography variant="small" color="gray" className="mb-4">
        Address: {restaurant.address}
      </Typography>
      <Typography variant="small" color="gray" className="mb-4">
        Cuisine Type: {restaurant.cuisineType}
      </Typography>
      <Typography variant="small" color="gray" className="mb-4">
        Phone Number: {restaurant.phoneNumber}
      </Typography>
      <Typography variant="small" color="gray" className="mb-4">
        Rating: {restaurant.rating}
      </Typography>
      <Typography variant="small" color="gray" className="mb-4">
        Owner Email: {restaurant.ownerEmail}
      </Typography>
    </Card>
  ))}
</div>

  );
}

  

