import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
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
  PowerIcon,
  HomeIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { DarkMode } from "../shared/DarkMode";

const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon, path: "user/profile" },
  { label: "Edit Profile", icon: Cog6ToothIcon, path: "user/profile-update" },
  { label: "Deactivate Profile", icon: ArrowUpOnSquareIcon, path: "user/profile-delete" },
  { label: "Sign Out", icon: PowerIcon, path: "user/logout" },
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
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="User avatar"
            className="border border-gray-900 p-0.5"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 w-44">
        {profileMenuItems.map(({ label, icon, path }, key) => (
          <Link to={path} key={label} onClick={closeMenu}>
            <MenuItem className={`flex items-center gap-2 rounded ${key === profileMenuItems.length - 1 ? "hover:bg-red-500/10" : ""}`}>
              {React.createElement(icon, { className: `h-4 w-4 ${key === profileMenuItems.length - 1 ? "text-red-500" : ""}`, strokeWidth: 2 })}
              <Typography variant="small" className="font-normal" color={key === profileMenuItems.length - 1 ? "red" : "inherit"}>
                {label}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}

const navListItems = [
  { label: "Home", icon: HomeIcon, path: "/user/profile" },
  { label: "Restaurants", icon: BuildingOfficeIcon, path: "/restaurant" },
  { label: "Menu", icon: CakeIcon, path: "/menu" },
  { label: "Cart", icon: ShoppingCartIcon, path: "/user/cart" },
];

function NavList() {
  return (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, path }) => (
        <Typography
          key={label}
          as={Link}
          to={path}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
            <span className="text-gray-900">{label}</span>
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
    const handleResize = () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-full overflow-hidden">
      <Navbar className="sticky top-0 z-10  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-yellow-600">
        <div className="flex items-center justify-between text-blue-gray-900">
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
            className="lg:hidden ml-auto mr-2"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <DarkMode />
          <ProfileMenu />
        </div>
        <Collapse open={isNavOpen} className="lg:hidden">
          <NavList />
        </Collapse>
      </Navbar>

      <div className="mx-auto max-w-screen-lg py-12">
        <h1>User profile</h1>
      </div>
    </div>
  );
};
