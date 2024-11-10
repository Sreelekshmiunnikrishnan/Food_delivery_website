import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // Import axios instance

export const GetReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Loading state to show a loader until reviews are fetched

    // Fetch reviews on component mount
    const fetchReviews = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/review/getreviews",  // API endpoint for fetching reviews
            });
            setReviews(response.data);  // Store the fetched reviews in state
            console.log("Reviews fetched:", response.data);
        } catch (error) {
            console.log("Error fetching reviews:", error);
        } finally {
            setIsLoading(false);  // Set loading to false once data is fetched or error occurs
        }
    };
    /* const handleDeleteReview = async (reviewId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: `/review/deletereview/${reviewId}`,  // API endpoint to delete a review by its ID
            });
          console.log(reviewId);
          
            if (response.status === 200) {
                // Remove the deleted review from the state to update the UI
                setReviews(reviews.filter((review) => review._id !== reviewId));
                console.log("Review deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };
 */
    useEffect(() => {
        fetchReviews();  // Trigger fetching reviews when the component mounts
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;  // Show a loading message or spinner while reviews are being fetched
    }

    return (
        <div className="flex flex-wrap justify-center">
             
            
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="card card-compact  w-96 shadow-xl m-4 p-8">
                          <h2 className="text-indigo-500 font-bold">Reviews</h2>
                        <h3 className="text-amber-500 font-semi-bold">Menu Item: {review.menuName}</h3>
                        <p  className="text-amber-500 font-semi-bold"><strong>Rating:</strong> {review.rating} / 5</p>
                        <p  className="text-amber-500 font-semi-bold"><strong>Comment:</strong> {review.comment}</p>
                      <p className="text-amber-500 font-semi-bold"><strong>UserId:</strong> {review.userId}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};
