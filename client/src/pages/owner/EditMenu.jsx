import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

export const EditMenu = () => {
  const [menus, setMenus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMenu, setEditMenu] = useState(null); 
  const { id } = useParams(); 
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    restaurantName: '',
    description: '',
    price: '',
    image: '',
    restaurantId: ''
  });

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance({
          method: "GET",
          url: `/menu/getmenu/${id}`
      });
      setMenus(response.data);
   
    } catch (error) {
      console.log("Failed to fetch menu details",error);
    }finally {
      setIsLoading(false); 
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.image) {
      setError("Image is required.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("restaurantName", formData.restaurantName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("restaurantId", formData.restaurantId);
      formDataToSend.append("image", formData.image); // Add image to FormData

     
      await axiosInstance({
          method: "PUT",
          url: `/menu/updatemenu/${menus?._id}`,
          data: formDataToSend,
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file upload
          }
      });
      fetchMenu();
    
      navigate("/owner/myMenu");
    } catch (error) {
      console.error("Failed to update menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []); // Fetch the menu only once on component mount
  
  useEffect(() => {
    // When `menus` changes, update `formData`
    if (menus) {
      setFormData({
        name: menus.name || '',
        restaurantName: menus.restaurantName || '',
        description: menus.description || '',
        price: menus.price || '',
        restaurantId: menus.restaurantId || ''
      });
      setIsLoading(false); // Set loading to false after setting data
    }
  }, [menus]); // Update `formData` whenever `menus` changes
  

   const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 mt-15">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Menu</h2>
      <form 
        onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}
        className="flex flex-col gap-4"
      >
       <div className="w-full max-w-sm min-w-[200px]">
       <label className="block mb-2 text-sm text-slate-600">Menu Name</label>
        <input 
          name="name" 
          value={formData.name} 
          onChange={handleFormChange} 
          placeholder="Name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
       <label className="block mb-2 text-sm text-slate-600">Restaurant Name</label>
        <input 
          name="restaurantName" 
          value={formData.restaurantName} 
          onChange={handleFormChange} 
          placeholder="Restaurant name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
       <label className="block mb-2 text-sm text-slate-600">Description</label>
        <input 
          name="description" 
          value={formData.description} 
          onChange={handleFormChange} 
          placeholder="Description" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
       <label className="block mb-2 text-sm text-slate-600">Price</label>
        <input 
          name="price" 
          value={formData.price} 
          onChange={handleFormChange} 
          placeholder="Price" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
       <label className="block mb-2 text-sm text-slate-600">Restaurant Id</label>
        <input 
          name="restaurantId" 
          value={formData.restaurantId} 
          onChange={handleFormChange} 
          placeholder="Restaurant Id" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        /></div>
       {/*  <input
          type="file"
         name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border rounded" />
          </div>
        )} */}
          {/* Image Upload Field */}
        <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Upload Image</label>
              <input
                type="file"
               name="image"
                accept="image/*" // Allow only image files
                onChange={handleImageChange} // Call the function on change
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
            
            </div>
          

         
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover border rounded" />
            </div>
          )}

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
            onClick={() =>navigate("/owner/owner-profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
