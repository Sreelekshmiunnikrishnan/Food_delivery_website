import e from "express";
import { create, deleteRestaurant, getAllRestaurants, getRestaurant, updateRestaurant } from "../controllers/restaurantController";
const router = e.Router();

const Restaurant = require('../models/Restaurant'); // Import the Restaurant model

// Create a new restaurant
router.post('/', create);

// Get all restaurants
router.get('/', getAllRestaurants);

// Get a restaurant by ID
router.get('/:id', getRestaurant);

// Update a restaurant by ID
router.put('/:id', updateRestaurant);

// Delete a restaurant by ID
router.delete('/:id', deleteRestaurant);

export {router as restaurantRouter};
