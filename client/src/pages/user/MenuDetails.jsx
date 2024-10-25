import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams to get ID from URL
import { axiosInstance } from '../../config/axiosInstance'; // Import your Axios instance
import { toast, ToastContainer } from 'react-toastify'; // Import toast

import { useSelector } from 'react-redux';
import { Spinner } from '@material-tailwind/react';

export const MenuDetails = () => {
  const { id } = useParams();  // Use useParams to extract the menu ID from the URL
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);   // Initialize as null, not an array
  const [error, setError] = useState(null);  // State for error handling
  const navigate = useNavigate();
  const userAuthorized = useSelector((state)=>state.user.userAuthorized)

  const fetchMenu = async () => {
    try {
      if(userAuthorized){
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/getmenu/${id}`  // Use the ID from useParams in the URL
      });

      setMenu(response.data);  // Set the fetched menu data to state
      console.log("response ===", response.data);
    }else{
    toast.error("Login your account to add item to cart")
      navigate("/login");
    }
    } catch (error) {
      console.error('Error fetching menu:', error);
      setError('Could not fetch menu details');  // Handle the error
    } finally {
      setLoading(false);  // Set loading to false once the request completes
    }
  };
  

  const addToCart = async() =>{
    try {
     
     const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-to-cart" ,
         data: {menuId:id} // Use the ID from useParams in the URL
      });
      console.log("response ===", response.data);
      alert("Item successfully added to cart");
      toast.success("Item added to cart successfully");
      navigate("/user/profile");
    
    } catch (error) {
      console.log(error); 
      alert("Item already in  cart");
      toast.error(error?.response?.data?.message ||  'error adding product to cart') ;
    }
  };
  



  useEffect(() => {
    fetchMenu();  // Call the fetchMenu function when the component mounts
  }, []);  // Add id as a dependency to rerun the effect if the id changes

   if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!menu) return <div>Menu not found</div>;   // Handle case where no menu is found

  return (
    <div className="flex flex-wrap justify-center">
      <div key={menu._id} className="card card-compact bg-base-100 w-96 shadow-xl m-4">
        <figure>
          <img src={menu.image} alt={menu.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Item name: {menu.name}</h2>
          <p>Item Price: {menu.price}</p>
          <p>Restaurant Name: {menu.restaurantName}</p>
          <p>Description: {menu.description}</p>
          <p>Available: {menu.available ? "Yes" : "No"}</p>
        </div>
        
                <button className="btn btn-primary" onClick={addToCart} >ADD TO CART</button>
             
      </div>
    </div>
  );
};
