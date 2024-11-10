import React, { useState,useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { MenuCard } from '../../components/user/Card';
import { useFetch } from "../../hooks/UseFetch";

import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';
export const MenuItems = () => {
 // const [menus, loading,error] = useFetch("/menu/getmenuitems");
  const [menus,setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMenus = async() => {
    try {
      const response = await axiosInstance({
        method:"GET",
        url:"/menu/getmenuitems"
       });
      
       setMenus(response.data);
       //console.log("response===",response);
       
    } catch (error) {
      console.log(error);
      toast.error("Failed to load menu.")
      //setError("Failed to load restaurants.");
    }
  };
    useEffect(()=>{
      fetchMenus();
    },[]); 
    
      
       /*  if(isLoading) {
          return (
            <div className="flex justify-center items-center pt-10">
              <Spinner />
            </div>
          );
          } */
        
          return (
    <div className="flex flex-wrap justify-center pt-15">
       {menus.map((menu) => (
        <div key={menu._id} className="card card-compact bg-base-100 w-96 shadow-xl m-4 p-8">
          <figure>
            <img src={menu.image} alt="menu" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Item name :{menu.name}</h2>
            <p> Item Price :{menu.price}</p>
            <div className="card-actions justify-end">
              <Link to={`/menudetails/${menu._id}`}>
                <button className="btn btn-primary" >More Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))} 
     
    </div>
      
  );
}
  

