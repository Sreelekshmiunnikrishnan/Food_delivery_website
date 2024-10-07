import e from "express";

const router = e.Router();

import { register,login } from "../controllers/usercontrollers.js";

router.post("/signup",register)
router.post("/login",login)
//router.put("/profile-update",updateProfile)
//router.get("/profile",getProfile)
//router.delete("/profile-delete",deleteProfile)
//router.post("/logout",logout)
//router.get("/check-user",(req,res,next)=>{})
    


export {router as userRouter};