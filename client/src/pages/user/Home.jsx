import React from "react";
import { Carousel } from "@material-tailwind/react";

export const Home = () => {
  return (
    <div className="pt-10">
      {/* Marquee Section */}
      <div className="w-full bg-white py-2 overflow-hidden">
        <p className="animate-marquee whitespace-nowrap text-xl font-bold text-orange">
          <marquee>
            Order your favourite food here!
          </marquee>

        </p>
      </div>

      {/* Full-Width Banner Image */}
      <img
        className="h-auto max-h-[500px] w-full object-cover"
        src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489531/cld-sample-4.jpg"
        alt="Food Banner"
      />

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center h-auto bg-gray-100 p-6">
        {/* Left Section (Image & Text) */}

        {/* Right Section (Carousel) */}
        <Carousel className="rounded-xl max-w-full lg:max-w-[50%] lg:max-h-[400px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489520/samples/food/dessert.jpg"
            alt="Delicious dish"
            className="h-full w-full object-cover"
          />
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489520/samples/food/pot-mussels.jpg"
            alt="Pot of mussels"
            className="h-full w-full object-cover"
          />
          <img
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1728489530/samples/dessert-on-a-plate.jpg"
            alt="Dessert on a plate"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
      
      <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-100 p-6">
      <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-yellow text-center lg:text-left">
        Get Our Mobile app through
      </p>
        {/* First Image Section */}
        <div className="flex flex-col justify-center items-center lg:max-w-[30%]">
          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.photos&hl=en&pli=1" target="_blank" rel="noopener noreferrer">
            <img
              src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1733821027/img6_qck7lj.png"
              alt="Dessert on a plate"
              className="h-full w-full object-cover"
            />
          </a>
        </div>

        {/* Second Image Section */}
        <div className="flex flex-col items-center lg:items-end lg:max-w-[50%] lg:pr-8 mb-6 lg:mb-0">
          <img
            className="w-auto h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg shadow-lg object-cover"
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1729102867/bg1_aagyyw.avif"
            alt="Delicious food"
          />
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-yellow text-center lg:text-left">
            You stay at home, we deliver...
          </p>
        </div>
      </div>

    </div>
  );
};
