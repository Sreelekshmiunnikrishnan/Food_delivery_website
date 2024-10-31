import express from 'express';
import { createPayment, sessionstatus } from '../controllers/paymentControllers.js';
import {authUser} from '../middlewares/authUser.js';
const router = express.Router();

router.post("/create-checkout-session",authUser,createPayment)
router.get("/sessionstatus",authUser,sessionstatus)

export { router as paymentRouter}
