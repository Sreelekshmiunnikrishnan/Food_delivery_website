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

   

    useEffect(() => {
        fetchReviews();  // Trigger fetching reviews when the component mounts
    }, []);
    const handleDelete = async (reviewId) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: `/user/deletereview/${reviewId}`,  // API endpoint for deleting a review
            });
            setReviews(reviews.filter(review => review._id !== reviewId));  // Update state to remove the deleted review
            console.log(`Review with ID ${reviewId} deleted`);
        } catch (error) {
            console.log("Error deleting review:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;  // Show a loading message or spinner while reviews are being fetched
    }

    return (
        <div className="flex flex-wrap justify-center">
             
            
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="card card-compact  w-96 shadow-xl m-4 p-8 bg-white">
                          <h2 className="text-yellow font-bold">Reviews</h2>
                        <h3 className="text-yellow font-semi-bold">Menu Item: {review.menuName}</h3>
                        <p  className="text-yellow font-semi-bold"><strong>Rating:</strong> {review.rating} / 5</p>
                        <p  className="text-yellow font-semi-bold"><strong>Comment:</strong> {review.comment}</p>

                        <p  className="text-yellow font-semi-bold"><strong>Email:</strong> {review.email}</p>

                        <button 

                        
                            onClick={() => handleDelete(review._id)}  // Pass the review ID to the delete handler
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Delete
                        </button>

                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};
