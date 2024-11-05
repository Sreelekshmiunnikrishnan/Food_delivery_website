import e from "express";

import {adminSignin, getAllUser,getUserProfile, getAdminProfile, logout, checkAdmin ,blockUser, register,getAllOwners, blockOwner, getOwnerProfile, unblockUser, unblockOwner} from "../controllers/adminControllers.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { getAllRestaurants, getRestaurant } from "../controllers/restaurantController.js";
const router = e.Router();

router.post("/signup",register)
router.post("/login",adminSignin)
router.get("/getusers",authAdmin, getAllUser)
router.get("/getowners",authAdmin,getAllOwners);
router.get("/user-profile/:id",authAdmin, getUserProfile)
router.put("/block-user/:id",authAdmin,blockUser)
router.put("/unblock-user/:id",authAdmin,unblockUser)
router.put("/unblock-owner/:id",authAdmin,unblockOwner)
router.get("/owner-profile/:id",authAdmin, getOwnerProfile)
router.put("/block-owner/:id",authAdmin,blockOwner)

router.get('/getRestaurant/:id',getRestaurant);
router.get("/admin-profile",authAdmin,getAdminProfile)
router.post("/logout",authAdmin,logout)
router.get("/check-admin",authAdmin,checkAdmin)
    


export {router as adminRouter};