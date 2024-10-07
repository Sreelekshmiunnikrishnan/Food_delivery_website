import e from "express";

import { authenticate, deleteProfile, getProfile, logout, register, signin, updateProfile } from "../controllers/adminControllers.js";
const router = e.Router();

router.post("/signup",register)
router.post("/login",signin)
router.put("/profile-update",authenticate,updateProfile)
router.get("/profile",authenticate,getProfile)
router.delete("/profile-delete",authenticate,deleteProfile)
router.post("/logout",logout)
//router.get("/check-admin",(req,res,next)=>{})
    


export {router as adminRouter};