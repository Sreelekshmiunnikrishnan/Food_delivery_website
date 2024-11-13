
import { Review } from "../models/reviewModel.js";
import { MenuItem} from "../models/menuModel.js";
import { Order} from "../models/orderModel.js";

export const addReview = async (req, res, next) => {
    try {
      const { menuName, orderId, itemId, rating, comment } = req.body;
      const userId = req.user.id;
  
      // Check if the user ordered the item
      const order = await Order.findOne({
        _id: orderId,  // Ensure you use `_id` if `orderId` refers to MongoDB's default ID field
        items: { $elemMatch: { _id: itemId } },  // Match the item ID within the order
      });
  
      if (!order) {
        return res.status(403).json({ message: "You can only review items you have ordered, or check if the menu name is correct." });
      }
  
      // Validate rating range
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Please provide a rating between 1 and 5." });
      }
  
      // Create or update the review
      const review = await Review.findOneAndUpdate(
        { userId, itemId },  // Assuming each user reviews a unique item
        { rating, comment, menuName },
        { new: true, upsert: true }  // Create a new review if none exists
      );
  
      // Optionally update the average rating for the item if required
      res.status(201).json(review);
    } catch (error) {
      console.error("Error adding review:", error);
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
export const getReviews = async (req, res,next) => {
    try {
     
        const userId = req.user.id;
        const reviews = await Review.find({ userId })
           
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
export const getAllReviews = async (req, res,next) => {
    try {
     
       
        const reviews = await Review.find()
           
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


export const deleteReview = async (req, res, next) => {
    try {
        const  reviewId  = req.params.id;
        const userId = req.user.id;
        console.log(`User ${userId} is attempting to delete review ${reviewId}`);

        const review = await Review.findOne({ _id: reviewId, userId });
        if (!review) {
            return res.status(403).json({ message: "Review not found or not authorized" });
        }

       const response =await Review.deleteOne({ _id: reviewId });
       if(response){
        console.log(`Review deleted by user ${userId}: ${reviewId}`);
        res.status(200).json({ message: "Review deleted successfully" });
       }
    } catch (error) {
        console.error(`Error deleting review: ${error.message}`);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteReviewsOwner = async (req, res, next) => {
    try {
        const  reviewId  = req.params.id;
        
        const review = await Review.findOne({ _id: reviewId });
        if (!review) {
            return res.status(403).json({ message: "Review not found or not authorized" });
        }

       const response =await Review.deleteOne({ _id: reviewId });
       if(response){
        console.log(`Review deleted : ${reviewId}`);
        res.status(200).json({ message: "Review deleted successfully" });
       }
    } catch (error) {
        console.error(`Error deleting review: ${error.message}`);
        res.status(500).json({ message: "Internal server error", error: error.message });
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
