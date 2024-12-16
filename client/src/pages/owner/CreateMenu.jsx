import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance';
import { Card, Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';
export const CreateMenu = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant._id === data.restaurantId
    );
  
    const restaurantName = selectedRestaurant ? selectedRestaurant.name : null;
  
    if (!restaurantName) {
      toast.error("Invalid restaurant selected.");
      return;
    }
    // Append all form fields to the FormData object
    formData.append('name', data.name);
    formData.append('restaurantName', restaurantName);
    formData.append('restaurantId', data.restaurantId);
    formData.append('description', data.description);
    formData.append('price', data.price);

    // Append the selected image file
    if (data.image[0]) {
      formData.append('image', data.image[0]); // [0] because 'image' is an array
    }

    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/menu/create",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        }
      });
      console.log(response, '======response');
     
      toast.success("Menu created succesfully..")
      navigate("/owner/mymenu");
    } catch (error) {
      toast.error("Failed to create menu. Please try again.");

      console.error(error);
    }
  };
  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/getOwnRestaurant');
      if (response) {
        setRestaurants(response.data);
      } else {
        toast.error("You haven't created any restaurants yet..");
      }
    } catch (error) {
      setError("Failed to load restaurants.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle image file selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="flex justify-center items-center  bg-gray-100 min-h-screen">
      <Card className="w-300 p-6 mb-10">
        <Typography variant="h4" color="indigo" className="mb-4 text-center">
          Food Menu
        </Typography>
        <p className="text-yellow font-light">
          Welcome! Enter details to create food menu.
        </p>
        <form className="mt-8 mb-2 w-120 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">

            {/* Menu Name Field */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Menu Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Menu Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            {/* Restaurant Dropdown Field */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Select Restaurant</label>
              {isLoading ? (
                <p>Loading restaurants...</p>
              ) : error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : restaurants.length === 0 ? (
                <p className="text-yellow-500 text-sm">No restaurants found. Create one first.</p>
              ) : (
                <select
                  {...register("restaurantId", { required: "Please select a restaurant" })}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                >
                  <option value="">-- Select Restaurant --</option>
                  {restaurants.map((restaurant) => (
                    <option key={restaurant._id} value={restaurant._id} data-name={restaurant.name}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.restaurantId && <p className="text-red-500 text-sm">{errors.restaurantId.message}</p>}
            </div>



            {/*  <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Restaurant Id</label>
              <input
                type="text"
                {...register("restaurantId", { required: "Restaurant id is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Restaurant Id"
              />
              {errors.restaurantId && <p className="text-red-500 text-sm">{errors.restaurantId.message}</p>}
            </div> */}

            {/* Description Field */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Description"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Price Field */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Price</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Price"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            {/* Image Upload Field */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Upload Image</label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                accept="image/*" // Allow only image files
                onChange={handleImageChange} // Call the function on change
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border rounded" />
            </div>
          )}

          <div className="flex justify-center">
            <button className="btn btn-primary">Create</button>
          </div>

         
        </form>
      </Card>
    </div>
  );
};
