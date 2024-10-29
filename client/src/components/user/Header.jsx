import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Restaurants", path: "/restaurant" },
        { name: "Menu", path: "/menu" },

      ].map((item) => (
        <Typography
          key={item.name}
          as="li"
          variant="h4"
          color="deep-orange"
          className="hidden lg:inline-block"
        >
          <Link to={item.path} className="flex items-center">
            {item.name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className= "max-w-full">
      <Navbar className="sticky top-0 z-10  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-yellow-600">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Avatar
            variant="circular"
            size="lg"
            alt="Logo"
            className="border border-gray-900 p-1.0 mr-4"
            src="https://res.cloudinary.com/dmv3ax1yt/image/upload/v1729088573/Logo_wodfig.png"
          />

          <div className="flex items-center justify-between w-full lg:gap-80">
            <div className="mr-4 hidden lg:block">{navList}

            </div>

            <div className="flex items-center gap-x-1">
              <DarkMode />
              <Menu>
                <MenuHandler>
                  <Button color="deep-orange" variant="text"
                    size="lg" className="hidden lg:inline-block" ripple={true}>
                    Login Options
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="text-lg text-gray-700 px-4 py-2 hover:bg-gray-200 hover:text-blue-600 !important" onClick={() => navigate("/login")}>User Login</MenuItem>
                  <MenuItem className="text-lg text-gray-700 px-4 py-2 hover:bg-gray-200 hover:text-blue-600" onClick={() => navigate("/admin/login")}>Admin Login</MenuItem>
                  <MenuItem className="text-lg text-gray-700 px-4 py-2 hover:bg-gray-200 hover:text-blue-600" onClick={() => navigate("/owner/login")}>
                    Restaurant Owner Login
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* <Button
                variant="text"
                size="lg"
                className="hidden lg:inline-block"
                color="deep-orange"
                onClick={() => navigate("/login")}
              >
                <span>Log In</span>
              </Button> */}
              <Button
                variant="gradient"
                size="lg"
                className="hidden lg:inline-block"
                color="deep-orange"
                onClick={() => navigate("/signup")}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          </div>
        </div>

        <Collapse open={openNav} className="lg-hidden">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" onClick={() => navigate('/login')}>
              <span>Log In</span>
            </Button>


            <Button fullWidth variant="gradient" size="sm" onClick={() => navigate('/signup')}>
              <span>Sign Up</span>
            </Button>
          </div>
        </Collapse>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          className="ml-auto lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? "Close" : "Menu"}
        </IconButton>
      </Navbar>


    </div>
  );
}; 