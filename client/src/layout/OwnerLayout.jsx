import React from 'react'
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { saveOwner,clearOwner} from "../redux/features/ownerSlice"
import { OwnerHeader} from "../components/owner/OwnerHeader"
import { login, logout } from '../redux/features/authSlice';
export const OwnerLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ownerAuthorized = useSelector((state) => state.owner.isOwnerAuthorized);
  
  console.log(ownerAuthorized,"==ownerAuthorized");
  
    const checkOwner = async () => {
      try {

         const response = await axiosInstance({ method: "GET", url: "/owner/check-owner",credentials:'include'
         
           });
          console.log(response, "====response");
          dispatch(saveOwner(response?.data?.data));

      } catch (error) {
          console.log(error, "===error");
          dispatch(clearOwner());
         
      }
  };

  useEffect(() => {
      checkOwner();
  }, [location.pathname]); 
 /* if (ownerAuthorized === undefined) {
  return <div>Loading...</div>;
}  
  */
  return (
    <div className="flex flex-col min-h-screen">
    <div className="pt-3 flex-grow">
       {ownerAuthorized ?  <OwnerHeader /> : <Header />}
         
       <div className="min-h-110">
                <Outlet />

            </div>
            <Footer />
        </div>
        </div>
  )
}
