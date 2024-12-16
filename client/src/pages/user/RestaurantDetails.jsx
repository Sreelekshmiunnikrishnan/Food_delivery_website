import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams to get ID from URL
import { axiosInstance } from '../../config/axiosInstance'; // Import your Axios instance
import { Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export const RestaurantDetails = () => {
  const { id } = useParams();
  const [menus, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);   // Initialize as null, not an array
  const [error, setError] = useState(null);  // State for error handling
  const navigate = useNavigate();
   const fetchMenu = async () => {
       try {
       
         const response = await axiosInstance({
           method: "GET",
           url: `/restaurant/getmenu/${id}`  // Use the ID from useParams in the URL
         });
         if(response){
         setMenu(response.data);  // Set the fetched menu data to state
         
         console.log("response ===", response.data);
         }else{
           toast.error("No food item available..")
         }
       } catch (error) {
         console.error('Error fetching menu:', error);
         setError('Could not fetch menu details');  // Handle the error
       } finally {
         setLoading(false);  // Set loading to false once the request completes
       }
     };
      useEffect(()=>{
           fetchMenu();
         },[]); 
         
  return (
   <div className="flex flex-wrap justify-center pt-15">
          {menus.map((menu) => (
           <div key={menu._id} className="card card-compact bg-base-100 w-96 shadow-xl m-4 p-8">
             <figure>
               <img src={menu.image} alt="menu" />
             </figure>
             <div className="card-body">
               <h2 className="card-title">{menu.name}</h2>
               <p>{menu.price}/-</p>
               <div className="card-actions justify-center">
                 <Link to={`/menudetails/${menu._id}`}>
                   <button className="btn btn-primary " >More Details</button>
                 </Link>
               </div>
             </div>
           </div>
         ))} 
        
       </div>
         
  )
}
