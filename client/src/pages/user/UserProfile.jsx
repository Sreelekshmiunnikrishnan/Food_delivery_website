import React from 'react'
import { Card,Button,Typography,CardBody,CardFooter,CardHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
export const UserProfile = () => {
  const navigate = useNavigate();
  return (
    
     <div className="flex items-center justify-center  bg-gray-100">
      <Card className="w-full max-w-md sm:w-96 mt-4 flex flex-col">
        <CardHeader color="blue-gray" className="relative h-48 sm:h-80">
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489529/samples/breakfast.jpg"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardBody className="p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
            Go through Our Menu
          </Typography>
          <Typography className="text-center">
          "One cannot think well, love well, sleep well, if one has not dined well." - Virginia Woolf
          </Typography>
        </CardBody>
        
      </Card>
      <Card className="w-full max-w-md sm:w-96 mt-4 flex flex-col">
        <CardHeader color="blue-gray" className="relative h-48 sm:h-80">
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489530/samples/dessert-on-a-plate.jpg"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardBody className="p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
            Go through Our Menu
          </Typography>
          <Typography className="text-center">
          "A party without cake is just a meeting." - Julia Child
          </Typography>
        </CardBody>
       
      </Card>
      <Card className="w-full max-w-md sm:w-96 mt-4 flex flex-col">
        <CardHeader color="blue-gray" className="relative h-48 sm:h-80">
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489520/samples/food/pot-mussels.jpg"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardBody className="p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
            Go through Our Menu
          </Typography>
          <Typography className="text-center">
          "Food is not rational. Food is culture, habit, craving, and identity." - Jonathan Safran Foer
          </Typography>
        </CardBody>
        
      </Card>
    </div>
  )
}
