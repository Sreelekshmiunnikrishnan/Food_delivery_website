import express from 'express';
import { addReview,getAverageRating,getMenuReviews,deleteReview, getReviews } from '../controllers/reviewControllers.js';
import {authUser} from '../middlewares/authUser.js';
const router = express.Router();

router.post("/addreview",authUser,addReview)
router.get("/getreviews/:id",authUser,getMenuReviews)
router.get("/getreviews",authUser,getReviews);
router.get("/getavg/:id",authUser,getAverageRating )
router.delete("/deletereview/:id",authUser,deleteReview)

export { router as reviewRouter}