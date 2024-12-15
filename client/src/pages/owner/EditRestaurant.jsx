import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisineType: "",
    phoneNumber: "",
    rating: "",
    ownerEmail: "",
  });

  // Fetch restaurant data by ID
  const fetchRestaurant = async () => {
    try {
      const response = await axiosInstance.get(`/restaurant/getRestaurant/${id}`);
      const fetchedRestaurant = response.data;

      // Set restaurant data and autofill formData
      setRestaurant(fetchedRestaurant);
      setFormData({
        name: fetchedRestaurant.name || "",
        address: fetchedRestaurant.address || "",
        cuisineType: fetchedRestaurant.cuisineType || "",
        phoneNumber: fetchedRestaurant.phoneNumber || "",
        rating: fetchedRestaurant.rating || "",
        ownerEmail: fetchedRestaurant.ownerEmail || "",
      });
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      toast.error("Failed to load restaurant details.");
    }
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle restaurant update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/restaurant/updateRestaurant/${id}`, formData);
      toast.success("Restaurant updated successfully.");
      navigate("/owner/myrestaurants");
    } catch (error) {
      console.error("Failed to update restaurant:", error);
      toast.error("Failed to update restaurant.");
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 pb-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Restaurant</h2>
      {restaurant ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Restaurant Name"
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
              className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 underline ml-4"
              onClick={() => navigate("/owner/myrestaurants")}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading restaurant details...</p>
      )}
    </div>
  );
};
