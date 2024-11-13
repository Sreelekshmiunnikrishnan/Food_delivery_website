

import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "../pages/user/ErrorPage";
import { About } from "../pages/shared/About";

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
import {OwnerProfile} from "../pages/owner/OwnerProfile";
import { CreateRestaurant} from "../pages/owner/CreateRestaurant";

import { CreateMenu} from "../pages/owner/CreateMenu";
import { EditMenu} from "../pages/owner/EditMenu";
import { EditProfiles } from "../pages/owner/EditProfiles";
import { DeleteProfiles } from "../pages/owner/DeleteProfiles";
import { Logouts } from "../pages/owner/Logouts";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { PaymentSuccess } from "../pages/user/PaymentSuccess";
import { GetRestaurants } from "../pages/owner/GetRestaurants";
import { EditRestaurant } from "../pages/owner/EditRestaurant";
import { MyRestaurants } from "../pages/owner/MyResturants";
import { Mymenu } from "../pages/owner/Mymenu";
import { Review } from "../pages/user/Review";
import { GetReviews } from "../pages/user/GetReviews";
import { UserOrder } from "../pages/owner/UserOrder";
import { GetReview } from "../pages/owner/GetReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "restaurant", element: <Restaurants /> },
      { path: "menu", element: <MenuItems /> },
      { path: "menudetails/:id", element: <MenuDetails /> },
      {
        path: "user",
        element: <ProtectRoute role="user" />,
        children: [
          { path: "profile", element: <UserProfile /> },
          { path: "profile-update", element: <EditProfile /> },
          { path: "profile-delete", element: <DeleteProfile /> },
          { path: "cart", element: <Cart /> },
          { path: "restaurant", element: <Restaurants /> },
          { path: "menu", element: <MenuItems /> },
          { path: "menudetails/:id", element: <MenuDetails /> },
          {path:"logout",element:<Logout />},
          {path:"payment/success",element:<PaymentSuccess />},
          {path:"payment/cancel",element:<Cart />},
          {path:"order",element:<Order />},
          { path: "review/:orderId/:itemId", element: <Review /> }, 
          {path:"review",element:<GetReviews />}
        ],
      },
    ],
  },
  {
    path: "owner",
    element: <OwnerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage role="restaurantOwner" />,
      },
      {
        element:<ProtectRoute role="restaurantOwner" />,
        children:[
      {
        path: "owner-profile",
        element: <OwnerProfile />,
      },
      {
        path: "profile-update",
        element: <EditProfiles />,
      },
      {
        path: "profile-delete",
        element:<DeleteProfiles />,
      },
      {
        path: "logout",
        element:<Logouts />,
      },
      {
        path: "createrestaurant",
        element: <CreateRestaurant />,
      },
      {
        path: "createmenu",
        element: <CreateMenu />
      },
      {
        path: "myrestaurants",
        element: <MyRestaurants />
      },
      {
        path: "editRestaurant/:id",
        element: <EditRestaurant />
      },
      {
        path: "mymenu",
        element: <Mymenu />
      },
      {
        path: "editMenu/:id",
        element: <EditMenu />
      },
      {
        path: "userorders",
        element: <UserOrder />
      },
      {
        path: "userreviews",
        element: <GetReview />
      },
      /* {
        path: "logout",
        element: <Home />
      }, */
    ],
  },
     ],
  },
 
   {
    path: "admin",
    element:<AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage role="admin" />,
      },
      {
      element:<ProtectRoute role="admin" />,
      children:[
        {
        path: "admin-profile",
        element: <AdminProfile />,
        },
      ],
      },
    // Other admin routes, such as dashboard, settings, etc.
    ],
  }, 
  
  
  
]);
