import e from "express";

const router = e.Router();

import { register,login, checkUser,updateProfile,getProfile,deleteProfile,logout } from "../controllers/usercontrollers.js";
import {authUser} from '../middlewares/authUser.js';
import { getAllRestaurants, getRestaurant } from "../controllers/restaurantController.js";
import { deleteReview } from "../controllers/reviewControllers.js";

router.post("/signup",register)
router.post("/login",login)
router.put("/profile-update",authUser,updateProfile)
router.get("/profile",authUser,getProfile)
router.delete("/profile-delete",authUser,deleteProfile)
router.delete("/deletereview/:id",authUser,deleteReview);
router.post("/logout",authUser,logout)
router.get("/check-user",authUser,checkUser)
router.get("getAllRestaurants",authUser,getAllRestaurants)
router.get('/getRestaurant/:id',authUser,getRestaurant);
//router.post('/add-to-cart',authUser,addToCart);
//router.get('/getcart',authUser,getFromCart);
//router.delete('/deletecart',authUser,removeFromCart);

export {router as userRouter};