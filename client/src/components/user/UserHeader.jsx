import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
 CakeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowUpOnSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  HomeIcon
} from "@heroicons/react/24/solid";
import { DarkMode } from "../shared/DarkMode";
import { Restaurants } from "../../pages/user/Restaurants";
 import { router } from "../../router/router";
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path :"user/profile"
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    path :"user/profile-update"
  },
  {
    label: "Deactivate Profile",
    icon: ArrowUpOnSquareIcon,
    path :"user/profile-delete"
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path :"user/logout"
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
         
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon,path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to={path} key={label} onClick={closeMenu}> {/* Use Link here */}
            <MenuItem
              key={label}
            
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
               
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              
              </Typography>
            </MenuItem></Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      {/* <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden gap-40">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500 " />{" "}
        Pages{" "}
      </MenuItem> */}
     {/*  <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul> */}
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    path:"/user/profile"
  },
  {
    label: "Restaurants",
    icon: BuildingOfficeIcon,
     path: "/user/restaurant" ,
    
    },
    {
      label: "Menu",
      icon:CakeIcon,
       path: "/user/menu" ,
      
      },
  {
    label: "Cart",
    icon: ShoppingCartIcon,
    path : "/user/cart"
  },
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon,path }, key) => (
        <Typography
          key={label}
          as={Link} // Use Link component from react-router-dom
          to={path}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export const UserHeader = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] ">
    <Navbar className="sticky top-0 z-10  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-yellow-600">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
      <Avatar
            variant="circular"
            size="lg"
            alt="Logo"
            className="border border-gray-900 p-1.0 mr-4"
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1729088573/Logo_wodfig.png"
          />
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
 
        <DarkMode />
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
    {/* Content Section */}
    <div className="mx-auto max-w-screen-lg py-12">
        
        <h1>User profile</h1>
    </div>
    </div>
  );
}