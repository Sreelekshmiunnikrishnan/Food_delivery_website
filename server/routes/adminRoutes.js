import e from "express";

import {adminSignin, getAllUser,getUserProfile, getAdminProfile, logout, checkAdmin ,blockUser, register} from "../controllers/adminControllers.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { getAllRestaurants, getRestaurant } from "../controllers/restaurantController.js";
const router = e.Router();

router.post("/signup",register)
router.post("/login",adminSignin)
router.get("/getusers",authAdmin, getAllUser)
router.get("/user-profile/:id",authAdmin, getUserProfile)
router.put("/block-user/:id",authAdmin,blockUser)
router.get("getAllRestaurants",getAllRestaurants)
router.get('/getRestaurant/:id',getRestaurant);
router.get("/admin-profile",authAdmin,getAdminProfile)
router.post("/logout",authAdmin,logout)
router.get("/check-admin",checkAdmin)
    


export {router as adminRouter};