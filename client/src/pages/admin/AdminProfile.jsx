import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from "react-router-dom";
//import { toast, ToastContainer } from 'react-toastify'; // Import toast
//import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import toast from 'react-hot-toast';
import {
  Card, Button, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon, UserCircleIcon, PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const AdminProfile = () => {
  const [open, setOpen] = useState(0);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const GetUsers = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/getusers"
      });

      setUsers(response.data);

      console.log("response===", response);

      setIsLoading(false);


    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const GetRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/getAllRestaurants");
      setRestaurants(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      setIsLoading(false);
    }
  };
  const GetRestaurantOwners = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/getowners"
      });

      setOwners(response.data);

      console.log("response===", response);

      setIsLoading(false);


    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleBlockUser = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `/admin/block-user/${userId}`,
        method: "PUT"
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: true, status: "Blocked" } : user
        )
      );
      //setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };
  const handleBlockOwner = async (ownerId) => {
    try {
      const response = await axiosInstance({
        url: `/admin/block-owner/${ownerId}`,
        method: "PUT"
      });
      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner._id === ownerId ? { ...owner, isBlocked: true, status: "Blocked" } : owner
        )
      );
      //setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to block owner:", error);
    }
  };
  const handleUnBlockOwner = async (ownerId) => {
    try {
      const response = await axiosInstance({
        url: `/admin/unblock-owner/${ownerId}`,
        method: "PUT"
      });
      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner._id === ownerId ? { ...owner, isBlocked: false, status: "Active" } : owner
        )
      );
      //setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to block owner:", error);
    }
  };
  const GetMenus = async () => {
    try {
      const response = await axiosInstance.get("/menu/getmenuitems");
      setMenus(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      setIsLoading(false);
    }
  };

  const handleUnBlockUser = async (userId) => {
    try {
      const response = await axiosInstance({
        url: `/admin/unblock-user/${userId}`,
        method: "PUT"
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: false, status: "Active" } : user
        )
      );
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
  };
  const handleGetOrder = async () => {
    try {
      const response = await axiosInstance.get("/admin/getorders"); // Simplified axios request with GET method
      if (response && response.data) {
        setOrders(response.data);
        console.log("Orders fetched successfully:", response.data);
      } else {
        console.log("Error fetching order details");
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };
  const fetchReview = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/getreviews",  // API endpoint for fetching reviews
      });
      setReviews(response.data);  // Store the fetched reviews in state
      console.log("Reviews fetched:", response.data);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/admin/admin-profile");
      setProfile(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/admin/logout"
      });
      if (response) {
        toast.success("Logout Successful");

        // Redirect to login page after the toast displays
        setTimeout(() => {
          navigate('/');
        }, 1000); // Wait for 1.5 seconds before redirecting
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (activeSection === 'GetUsers') {
      GetUsers();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'GetRestaurantOwners') {
      GetRestaurantOwners();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'LogOut') {
      handleLogout();
    }
  }, [activeSection]);
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (activeSection === 'Restaurants') {
      GetRestaurants();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'Menu') {
      GetMenus();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'Orders') {
      handleGetOrder();
    }
  }, [activeSection]);
  useEffect(() => {
    if (activeSection === 'Reviews') {
      fetchReview();
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    {/* Sidebar */}
    <Card
      className="flex-shrink-0 h-auto md:h-auto md:w-80 p-4 shadow-xl bg-gradient-to-b from-amber-200 to-amber-300 text-gray-900"
      style={{ minHeight: "100%" }}
    >
      {/* Sidebar Header */}
      <div className="mb-4 p-4 text-center md:text-left border-b border-gray-300">
        <Typography variant="h5" color="blue-gray">
          Admin Dashboard
        </Typography>
      </div>
  
      {/* Sidebar Navigation */}
      <List>
        {/* Dashboard Section */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 hover:bg-amber-400">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => setActiveSection("GetUsers")}
                className="hover:bg-amber-400"
              >
                Get Users
              </ListItem>
              <ListItem
                onClick={() => setActiveSection("GetRestaurantOwners")}
                className="hover:bg-amber-400"
              >
                Get Restaurant Owners
              </ListItem>
              <ListItem
                onClick={() => setActiveSection("Restaurants")}
                className="hover:bg-amber-400"
              >
                Get Restaurants
              </ListItem>
              <ListItem
                onClick={() => setActiveSection("Menu")}
                className="hover:bg-amber-400"
              >
                Get Menu
              </ListItem>
              <ListItem
                onClick={() => setActiveSection("Orders")}
                className="hover:bg-amber-400"
              >
                Orders
              </ListItem>
              <ListItem
                onClick={() => setActiveSection("Reviews")}
                className="hover:bg-amber-400"
              >
                Reviews
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
  
        {/* Divider */}
        <hr className="my-2 border-gray-300" />
  
        {/* Profile Section */}
        <ListItem
          onClick={() => setActiveSection("Profile")}
          className="hover:bg-amber-400"
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
  
        {/* Log Out Section */}
        <ListItem
          onClick={() => setActiveSection("LogOut")}
          className="hover:bg-amber-400"
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  
   
  
  
      {/* Main Body Section */}
      <div className="flex-grow p-6 bg-gray-100">
        {activeSection === 'Dashboard' && (
          <>
            <Typography variant="h4" className="text-center md:text-left mb-6">
              Dashboard Overview
            </Typography>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                Welcome to your admin dashboard! Here you can manage all aspects of your food ordering platform, from user management to analytics and financial insights.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">visibility</span>
                  Monitor user activity and restaurant performance.
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">bar_chart</span>
                  Analyze order statistics to improve service.
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">local_offer</span>
                  Manage promotions and customer support tickets.
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">track_changes</span>
                  Track real-time order statistics across the platform. Monitor peak order times, high-demand items, and overall platform performance to make data-driven decisions.
                </li>
                <li className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">feedback</span>
                  Regularly review user feedback to understand and improve the platform’s experience.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                This dashboard empowers you to manage the platform with clarity and precision—everything you need to keep operations running smoothly is right here. Let’s make the food ordering experience outstanding for everyone involved!
              </p>
            </div>
          </>
        )}
        {activeSection === 'Orders' && (
  <div className="orders-section">
    <Typography variant="h4" color="deep-orange" className="mb-4 text-center">
           Orders
            </Typography>
    {orders.length > 0 ? (
      orders.map((order, index) => (
        <div key={index} className="order-card bg-white p-5 shadow-md rounded-lg mb-4">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>User Email:</strong> {order.userEmail}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Quantity:</strong> {order.quantity}</p>

          <p><strong>Items:</strong></p>
          <div className="items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-2">
                <span>{item.menuName}</span>
                <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No orders found.</p>
    )}
  </div>
)}


        {activeSection === 'Reviews' && (
          <div className="w-2/3 h-auto ml-20">
            <Typography variant="h4" color="deep-orange" className="mb-4 text-center">
             User Reviews
            </Typography>

            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Card key={index} className="mb-6 p-4 shadow-lg bg-white">
                  <Typography variant="h5" color="gray" className="font-semibold">
                    Review ID: {review._id}
                  </Typography>
                  <Typography color="gray" className="mb-1">
                    <strong>User Email:</strong> {review.email}
                  </Typography>
                  <Typography color="gray" className="mb-1">
                    <strong>MenuItem Name:</strong> {review.menuName}
                  </Typography>
                  <Typography color="gray" className="mb-1">
                    <strong>Rating:</strong> {review.rating} / 5
                  </Typography>
                  <Typography color="gray" className="mb-1">
                    <strong>Comment:</strong> {review.comment}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography color="red">No reviews found.</Typography>
            )}
          </div>
        )}

{activeSection === 'GetUsers' && (
  <div className="overflow-x-auto">
    <Typography variant="h4" className="text-center md:text-left mb-4">
      User List
    </Typography>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 flex flex-col justify-between"
        >
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {user.name}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Address:</strong> {user.address}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Phone:</strong> {user.phoneNumber}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Status:</strong> {user.status}
            </Typography>
            <Typography variant="small" color="gray" className="mb-4">
              <strong>Blocked:</strong> {user.isBlocked ? 'Yes' : 'No'}
            </Typography>
          </div>
          <div className="flex justify-around">
            {user.isBlocked ? (
              <Button
                onClick={() => handleUnBlockUser(user._id)}
                className="bg-yellow text-white rounded-full px-4 py-2 hover:bg-yellow-600 transition duration-200"
                size="sm"
              >
                Unblock
              </Button>
            ) : (
              <Button
                onClick={() => handleBlockUser(user._id)}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-200"
                size="sm"
              >
                Block
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {activeSection === 'GetRestaurantOwners' && (
  <div className="overflow-x-auto">
    <Typography variant="h4" color="deep-orange" className="mb-4 text-center">
      Restaurant Owners List
    </Typography>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {owners.map((owner) => (
        <div
          key={owner.id}
          className="bg-white shadow-md rounded-lg border border-gray-300 p-4 flex flex-col justify-between"
        >
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              {owner.name}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Email:</strong> {owner.email}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Address:</strong> {owner.address}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Phone:</strong> {owner.phoneNumber}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Role:</strong> {owner.role}
            </Typography>
            <Typography variant="small" color="gray" className="mb-2">
              <strong>Status:</strong> {owner.status}
            </Typography>
            <Typography variant="small" color="gray" className="mb-4">
              <strong>Blocked:</strong> {owner.isBlocked ? 'Yes' : 'No'}
            </Typography>
          </div>
          <div className="flex justify-around">
            {owner.isBlocked ? (
              <Button
                onClick={() => handleUnBlockOwner(owner._id)}
                className="bg-yellow text-white rounded-full px-4 py-2 hover:bg-yellow-600 transition duration-200"
                size="sm"
              >
                Unblock
              </Button>
            ) : (
              <Button
                onClick={() => handleBlockOwner(owner._id)}
                className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-200"
                size="sm"
              >
                Block
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {activeSection === 'Profile' && (
          <div>
            <Typography variant="h4" color='deep-orange' className="mb-4 text-center">Admin Profile</Typography>
            <div className="flex flex-wrap justify-center md:justify-center  mt-4">
              <div className="card card-compact bg-gray w-full lg:w-96 shadow-xl p-4 m-4  rounded-lg">
                <h2 className="text-lg font-bold text-white mb-2 flex justify-center">Details</h2>
                <div className="card-body flex justify-center  h-80 w-50">
                  <p className="font-bold text-white"><span className="font-bold text-white">Name:</span> {profile.name}</p>
                  <p className="font-bold text-white"><span className="font-bold text-white">Email:</span> {profile.email}</p>
                  <p className="font-bold text-white"><span className="font-bold text-white">Role:</span> {profile.role}</p>
                  <p className="font-bold text-white"><span className="font-bold text-white">Address:</span> {profile.address}</p>
                  <p className="font-bold text-white"><span className="font-bold text-white">Phone number:</span> {profile.phoneNumber}</p>

                </div>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'Restaurants' && (
           <div className="overflow-x-auto">
            <Typography variant="h4" color="deep-orange" className="mb-4 text-center">Restaurant List</Typography>
          <div className="pt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {restaurants.map((restaurant) => (
                 <Card key={restaurant._id} className="p-6 shadow-lg">
                 <Typography variant="h5" color="blue-gray" className="font-bold mb-2">
                 
                         {restaurant.name}
                     
                       </Typography>
                 <Typography variant="small" color="gray" className="mb-4">
                   Address: {restaurant.address}
                 </Typography>
                 <Typography variant="small" color="gray" className="mb-4">
                   Cuisine Type: {restaurant.cuisineType}
                 </Typography>
                 <Typography variant="small" color="gray" className="mb-4">
                   Phone Number: {restaurant.phoneNumber}
                 </Typography>
                 <Typography variant="small" color="gray" className="mb-4">
                   Rating: {restaurant.rating}
                 </Typography>
                 <Typography variant="small" color="gray" className="mb-4">
                   Owner Email: {restaurant.ownerEmail}
                 </Typography>
               </Card>
             ))}
           </div>
           </div>
        )}
        {activeSection === 'Menu' && (
          <div className="overflow-x-auto">
            <Typography variant="h4" color="deep-orange" className="mb-4 text-center">Menu List</Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {menus.map((menu) => (
                <div key={menu.id} className="bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
                  <figure>
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">{menu.name}</h2>
                    <p className="text-gray-600">{menu.description}</p>
                    <p className="mt-2 text-sm text-gray-500">Restaurant: {menu.restaurantName}</p>
                    <p className="text-sm text-gray-500">Restaurant ID: {menu.restaurantId}</p>
                    <p className="mt-2 font-bold text-gray-800">Price: ₹{menu.price}</p>
                    <p className="text-sm text-gray-500">
                      Available: {menu.available ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {activeSection === 'LogOut' && (
          <Typography variant="h4" className="text-center md:text-left">Logging Out...</Typography>

        )}
      </div>
    </div>
  );
};
