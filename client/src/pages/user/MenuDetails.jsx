import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams to get ID from URL
import { axiosInstance } from '../../config/axiosInstance'; // Import your Axios instance

import toast from 'react-hot-toast';



import { useSelector } from 'react-redux';
import { Spinner } from '@material-tailwind/react';

export const MenuDetails = () => {
  const { id } = useParams();  // Use useParams to extract the menu ID from the URL
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);   // Initialize as null, not an array
  const [error, setError] = useState(null);  // State for error handling
  const navigate = useNavigate();
 

  const fetchMenu = async () => {
    try {
    
      const response = await axiosInstance({
        method: "GET",
        url: `/menu/getmenu/${id}`  // Use the ID from useParams in the URL
      });

      setMenu(response.data);  // Set the fetched menu data to state
      console.log("response ===", response.data);
    
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
      toast.success("Item added to cart successfully");
      navigate("/user/cart");
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //alert("You need to Log in to add items to the cart.");
        toast.error("You need to Log in to add items to the cart.");
        navigate("/login");
      } else {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Item already in  cart');

       
      }
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
          <h2 className="card-title"> {menu.name}</h2>
          <p className='font-bold'> {menu.price}/-</p>
          <p className='font-bold'> {menu.restaurantName}</p>
          <p className='font-bold'> {menu.description}</p>
          
        </div>
        
                <button className="btn btn-primary" onClick={addToCart} >ADD TO CART</button>
             
      </div>
    </div>
  );
};
