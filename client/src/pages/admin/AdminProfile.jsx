import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const AdminProfile = () => {

  const [open, setOpen] = useState(0);
  const [activeSection, setActiveSection] = useState('Dashboard'); // state for active section
  const [profile, setProfile] = useState([]);
  //  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/admin/admin-profile"
      });

      setProfile(response.data);

      console.log("response===", response);

      setIsLoading(false);


    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Card className="h-[calc(100vh-2rem)] w-64 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin Dashboard
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
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
                <ListItem onClick={() => setActiveSection('Analytics')}>
                  Analytics
                </ListItem>
                <ListItem onClick={() => setActiveSection('Reporting')}>
                  Reporting
                </ListItem>
                <ListItem onClick={() => setActiveSection('Projects')}>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* View Users Section */}
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  View users
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem onClick={() => setActiveSection('ViewRestaurantOwners')}>
                  View Restaurant Owners
                </ListItem>
                <ListItem onClick={() => setActiveSection('Products')}>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          <hr className="my-2 border-blue-gray-50" />

          <ListItem onClick={() => setActiveSection('Inbox')}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
          </ListItem>

          <ListItem onClick={() => setActiveSection('Profile')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>

          <ListItem onClick={() => setActiveSection('LogOut')}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>

      {/* Main Body Section */}
      <div className="flex-1 p-8">
        {activeSection === 'Dashboard' && <Typography variant="h4">Dashboard Overview</Typography>}
        {activeSection === 'Analytics' && <Typography variant="h4">Analytics Details</Typography>}
        {activeSection === 'Reporting' && <Typography variant="h4">Reporting Details</Typography>}
        {activeSection === 'Projects' && <Typography variant="h4">Projects Overview</Typography>}
        {activeSection === 'ViewRestaurantOwners' && <Typography variant="h4">Restaurant Owners List</Typography>}
        {activeSection === 'Products' && <Typography variant="h4">Product List</Typography>}
        {activeSection === 'Inbox' && <Typography variant="h4">Your Inbox</Typography>}
        {activeSection === 'Profile' && (
          <div>
            <Typography variant="h4">Admin Profile</Typography>
            <div className="flex flex-wrap justify-center">
              <div className="card card-compact bg-base-100 w-96 shadow-xl m-4">
                <h2>Details..</h2>
                <div className="card-body">

                  <p>Nmae :{profile.name} </p>
                  <p>Email :{profile.email} </p>
                  <p>Role :{profile.role} </p>
                  <p>Address :{profile.address} </p>
                  <p>Phone number :{profile.phoneNumber} </p>
                </div>

              </div>
            </div>
            <div>

            </div>
          </div>

        )}
        {activeSection === 'LogOut' && <Typography variant="h4">Logging Out...</Typography>}
      </div>
    </div>
  );
};
