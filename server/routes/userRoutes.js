import e from "express";

const router = e.Router();

import { register,login, checkUser,updateProfile,getProfile,deleteProfile,logout, updatePassword } from "../controllers/usercontrollers.js";
import {authUser} from '../middlewares/authUser.js';
import { getAllRestaurants, getRestaurant } from "../controllers/restaurantController.js";
import { deleteReview, getReviews } from "../controllers/reviewControllers.js";

router.post("/signup",register)
router.post("/login",login)
router.put("/profile-update",authUser,updateProfile)
router.get("/profile",authUser,getProfile)
router.delete("/profile-delete",authUser,deleteProfile)

router.post("/logout",authUser,logout)
router.get("/check-user",authUser,checkUser)
router.get("getAllRestaurants",authUser,getAllRestaurants)
router.get('/getRestaurant/:id',authUser,getRestaurant);
router.delete("/deletereview/:id",authUser,deleteReview);
router.patch("/updatepassword",updatePassword);
router.get('/getreviews',authUser,getReviews);
//router.delete('/deletecart',authUser,removeFromCart);

export {router as userRouter};
