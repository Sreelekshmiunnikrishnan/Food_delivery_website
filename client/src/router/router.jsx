

import { createBrowserRouter } from "react-router-dom";

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
import {OwnerProfile} from "../pages/owner/OwnerProfile";
import { CreateRestaurant} from "../pages/owner/CreateRestaurant";
import { EditRestaurant} from "../pages/owner/EditRestaurant";
import { CreateMenu} from "../pages/owner/CreateMenu";
import { EditMenu} from "../pages/owner/EditMenu";
import { EditProfiles } from "../pages/owner/EditProfiles";
import { DeleteProfiles } from "../pages/owner/DeleteProfiles";
import { Logouts } from "../pages/owner/Logouts";
import { AdminProfile } from "../pages/admin/AdminProfile";

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
          { path: "order", element: <Order /> },
          { path: "restaurant", element: <Restaurants /> },
         { path: "menu", element: <MenuItems /> },
         { path: "menudetails/:id", element: <MenuDetails /> },
          {path:"logout",element:< Logout/>},
          {path:"payment/success",element:<h2>Payment sucess</h2>},
          {path:"payment/cancel",element:<h2>Paymentcancelled</h2>}
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
      // Other owner routes
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage role="admin" />,
      },
       {
        path: "admin-profile",
        element:<AdminProfile />
      }, 
      // Other admin routes
    ],
  },
]);
