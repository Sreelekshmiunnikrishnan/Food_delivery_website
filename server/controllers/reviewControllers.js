
import { Review } from "../models/reviewModel.js";
import { MenuItem} from "../models/menuModel.js";
import { Order} from "../models/orderModel.js";

export const addReview = async (req, res,next) => {
    try {
        const { menuId, rating, comment } = req.body;
        const userId = req.user.id;
        //validate if user purchased the food
     //const order= await Order.findById(menuId);
      //if(!order){
       // return res.status(404).json({ message: "You can give review for an item only after purchasing." });
     // }
        // Validate if the menu item exists
        const menu = await MenuItem.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        if(rating>5 || rating <1 ){
           return res.status(400).json({ message: "Please provide a proper rating"});
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate(
            { userId, menuId },
            { rating, comment },
            { new: true, upsert: true }
        );

        // Optionally, you can update the food's average rating here

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



export const getMenuReviews = async (req, res,next) => {
    try {
        const { menuId } = req.params;
        const userId = req.user.id;
        const reviews = await Review.find({ userId })
            .populate("userId","comment")
            .sort({ createdAt: -1 });
          console.log(reviews);
          
        if (reviews.length === 0) {
           return res.status(404).json({ message: "No reviews found for this item" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



export const deleteReview = async (req, res,next) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



export const getAverageRating = async (req, res,next) => {
    try {
        const { menuId } = req.params;
        const userId = req.user.id;
        const reviews = await Review.find({userId });
       
        
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this item" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};