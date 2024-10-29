import e from "express";
const router = e.Router();

import { userRouter } from "./userRoutes.js";

import { adminRouter } from "./adminRoutes.js";
import { restaurantRouter } from "./restaurantRoutes.js";
import { MenuRouter } from "./menuRoutes.js";
import { ownerRouter } from "./ownerRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { orderRouter } from "./orderRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";


router.use("/user",userRouter);
router.use("/admin",adminRouter);
router.use("/restaurant",restaurantRouter);
router.use("/menu",MenuRouter);
router.use("/owner",ownerRouter);
router.use("/order",orderRouter);
router.use("/cart",cartRouter);
router.use("/review",reviewRouter);
router.use("/payment",paymentRouter);
export {router as apiRouter};