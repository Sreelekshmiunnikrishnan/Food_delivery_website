import React, { useEffect, useState } from 'react'
import { axiosInstance } from "../../config/axiosInstance";
import { RestaurantCard } from '../../components/user/Card';
import { Card, Typography } from "@material-tailwind/react";
//import { CardPlacehoderSkeleton } from '../../components/shared/Skeleton';
import { Spinner } from "@material-tailwind/react";
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
      //setError("Failed to load restaurants.");
    }

  };
  useEffect(() => {
    fetchRestaurants();
  }, []);
    if(isLoading) {
    <Spinner />
    }
  
    return (
    <div> 
    <Card className = "h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">  <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >Name </Typography></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">  <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >Address </Typography></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">   <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >Cuisine Type</Typography> </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">   <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >Phone Number</Typography></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">  <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            > Rating </Typography></th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">   <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >Owner email</Typography></th>
          </tr>
        </thead>
        <tbody>
        {restaurants.map((restaurant) => (
            <tr key={restaurant._id} className="even:bg-blue-gray-50/50">
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.name}</Typography></td>
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.address}</Typography></td>
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.cuisineType}</Typography></td>
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.phoneNumber}</Typography></td>
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.rating}</Typography></td>
              <td className="p-4"> <Typography variant="small" color="blue-gray" className="font-normal">{restaurant.ownerEmail}</Typography></td>
            </tr>
          ))}
       </tbody></table></Card>
       </div>
  );
}
  

