import e from "express";
const router = e.Router();

import { userRouter } from "./userRoutes.js";

//import { adminRouter } from "./adminRoutes.js";


router.use("/user",userRouter);
//router.use("/admin",adminRouter);

export {router as apiRouter};