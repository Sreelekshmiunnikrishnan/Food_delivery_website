import express from 'express';
import { createPayment } from '../controllers/paymentControllers.js';
import {authUser} from '../middlewares/authUser.js';
const router = express.Router();

router.post("/create-checkout-session",authUser,createPayment)


export { router as paymentRouter}
