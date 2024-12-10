import React, { useEffect,useState } from 'react'
import { Card,Button,Typography,CardBody,CardFooter,CardHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
export const UserProfile = () => {
  const [profile, setProfile] = useState([]);
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({method:"GET",
        url:"/user/profile"});

      setProfile(response.data);
    
       console.log("response===",response);
       
      setIsLoading(false);
   
      
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
   fetchProfile();
  },[]);
  if (isLoading) return <p>Loading...</p>;

  return (
  
      <div className="flex items-center justify-center p-10 bg-gray-100">
        {profile && profile.user && (
          <Card className="w-full max-w-lg sm:w-96 mt-4 bg-white shadow-lg rounded-lg">
            <CardBody className="relative h-48 sm:h-80 p-4">
              <h2 className="text-xl font-bold text-yellow mb-2">
                Welcome {profile.user.name}!!
              </h2>
              <p className="text-lg text-gray mb-1">
                <span className="font-semibold">Email Address:</span> {profile.user.email}
              </p>
              <p className="text-lg text-gray mb-1">
                <span className="font-semibold">Address:</span> {profile.user.address}
              </p>
              <p className="text-lg text-gray">
                <span className="font-semibold">Phone Number:</span> {profile.user.phoneNumber}
              </p>
              <p className="text-lg text-gray mb-1">
                <span className="font-semibold">Status:</span> {profile.user.status}
              </p>
              <p className="text-lg text-gray mb-1">
                <span className="font-semibold">UserId:</span> {profile.user._id}
              </p>
            </CardBody>
          </Card>
        )}
        {/* Additional Cards */}
       {/*  <Card className="w-full max-w-sm sm:w-96 mt-4 flex flex-col">
          <CardHeader color="blue-gray" className="relative h-48 sm:h-60">
            <img
              src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489530/samples/dessert-on-a-plate.jpg"
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Go through Our Menu
            </Typography>
            <Typography className="text-center">
            "Food is not rational. Food is culture, habit, craving, and identity." - Jonathan Safran Foer
            </Typography>
          </CardBody>
        </Card>
        <Card className="w-full max-w-sm sm:w-96 mt-4 flex flex-col">
          <CardHeader color="blue-gray" className="relative h-48 sm:h-60">
            <img
              src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489529/samples/breakfast.jpg"
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Go through Our Menu
            </Typography>
            <Typography className="text-center">
              "One cannot think well, love well, sleep well, if one has not dined well." - Virginia Woolf
            </Typography>
          </CardBody>
        </Card>
        <Card className="w-full max-w-sm sm:w-96 mt-4 flex flex-col">
          <CardHeader color="blue-gray" className="relative h-48 sm:h-60">
            <img
              src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489520/samples/food/pot-mussels.jpg"
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
              Go through Our Menu
            </Typography>
            <Typography className="text-center">
            "Food is our common ground, a universal experience." - James Beard
            </Typography>
          </CardBody>
        </Card> */}
      </div>
    );
  };