import e from "express";
import { checkOwner, createowner, deleteownerProfile, getOwnerProfile,ownerLogin,ownerlogout,updateOwnerProfile } from "../controllers/ownerController.js";
import { getAllRestaurants, getRestaurant } from "../controllers/restaurantController.js";
import { authRestOwner } from "../middlewares/authRestOwner.js";

const router = e.Router();


router.post("/signup",createowner)
router.post("/login",ownerLogin)
router.put("/profile-update",authRestOwner,updateOwnerProfile)
router.get("/owner-profile",authRestOwner,getOwnerProfile)
router.delete("/profile-delete",authRestOwner,deleteownerProfile)
router.post("/logout",authRestOwner,ownerlogout)
router.get("/check-owner",authRestOwner,checkOwner)
router.get("getAllRestaurants",authRestOwner,getAllRestaurants)
router.get('/getRestaurant/:id',authRestOwner,getRestaurant);
export {router as ownerRouter};