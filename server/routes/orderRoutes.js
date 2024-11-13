import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrderbyId, getOrders,  updateOrder } from '../controllers/orderControllers.js';
import {authUser} from '../middlewares/authUser.js';
const router = express.Router();

router.post("/createorder",authUser,createOrder)
router.get("/getorders",authUser,getOrders)
router.put("/updateorder/:id",authUser,updateOrder)
router.get("/getorder",authUser,getOrder)
router.delete("/deleteorder",authUser,deleteOrder)
router.get("/getorderbyid/:orderId",authUser,getOrderbyId);
export { router as orderRouter}
