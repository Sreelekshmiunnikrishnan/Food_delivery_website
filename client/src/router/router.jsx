

import { createBrowserRouter } from "react-router-dom";
import { AdminProfile} from "../pages/admin/AdminProfile";
import { ErrorPage } from "../pages/user/ErrorPage";
import { About } from "../pages/shared/About";
import { RestaurantDetails } from "../pages/user/RestaurantDetails";
import { Contact} from "../pages/shared/Contact";
import { Cart } from "../pages/user/Cart";
import { Home } from "../pages/user/Home";
import { Restaurants } from "../pages/user/Restaurants";
import { MenuDetails} from "../pages/user/MenuDetails";
import { EditProfile } from "../pages/user/EditProfile";
import { SignupPage} from  "../pages/shared/SignupPage";
import { LoginPage } from "../pages/shared/LoginPage";
import { OwnerLayout} from "../layout/OwnerLayout";
import { AdminLayout} from "../layout/AdminLayout";
import { ProtectRoute } from "./ProtectRoute";
import { UserProfile } from "../pages/user/UserProfile";
import { Order} from "../pages/user/Order";
import { MenuItems } from "../pages/user/MenuItems";
import { UserLayout } from "../layout/UserLayout";
import { Logout } from "../pages/user/Logout";
import { DeleteProfile } from "../pages/user/DeleteProfile";
export const router = createBrowserRouter([
    {
      path: "/",
      element:<UserLayout />,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "signup",
          element: <SignupPage />,
         
        },
        {
          path: "login",
          element: <LoginPage />,
         
        },
        {
        path: "",
        element: <Home />,
       
      },
      {
        path: "about",
        element: <About />,
        
      },
      {
        path: "contact",
        element: <Contact />,
        
      },

      
       {
        path: "restaurant",
        element: <Restaurants />,
        
      },
      {
        path: "menu",
        element: <MenuItems />
      },
      
      {
        path: "menudetails/:id",
        element:<MenuDetails />
      }, 
      {
        path: "user",
        element : <ProtectRoute  />,
        children: [
            {
                path: "profile",
                element: <UserProfile />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            /* {
                path: "restaurant",
                element: <Restaurants />,
            }, */
            {
                path: "order",
                element: <Order />
            },
           /*  {
              path: "menu",
              element: <MenuItems />
            },
             {
              path: "menudetails/:id",
              element:<MenuDetails />
            },  */
            {
              path: "profile-update",
              element:<EditProfile />
            }, 
            {
              path: "profile-delete",
              element:<DeleteProfile />
            }, 
            {
              path: "logout",
              element:<Logout />
            }, 
        ],
    }, 
    ],
  },
      {
        path : "owner",
        element :<OwnerLayout />,
        errorElement:<ErrorPage />,
      
      children : [
        
        {
          path: "login",
          element: <LoginPage role="restaurantOwner"/>,
         
        },
      
      ],
    },
    {
      path : "admin",
      element :<AdminLayout />,
      errorElement:<ErrorPage />,
    
    children : [
      
      {
        path: "login",
        element: <LoginPage role="admin"/>,
       
      },
    
    ],
  },
  ]);
