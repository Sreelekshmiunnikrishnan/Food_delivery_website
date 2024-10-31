import express from "express";
import { Restaurant } from "../models/restaurantModel.js";
import { MenuItem } from "../models/menuModel.js";
import mongoose from "mongoose";
import e from "express";
const router = e.Router();
// Create a new restaurant
export const create = async (req, res,next) => {
  try {
    const ownerId = req.user.id;
    console.log(ownerId);
    
    const { name,ownerEmail, address, phoneNumber, cuisineType,rating} = req.body;
    console.log(req.body);
    
    if(!name || !address || !phoneNumber ){
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newRestaurant = new Restaurant({
      name,
      ownerId,
      ownerEmail,
      address,
      phoneNumber,
      cuisineType,
      rating
      });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res,next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a restaurant by ID
export const getRestaurant = async (req, res,next) => {
  try {
    const {id} =req.params;
    const restaurant = await Restaurant.findById(id).populate('menuItems');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a restaurant by ID
export const updateRestaurant = async (req, res,next) => {
  try {
    const { name,ownerEmail, address, phoneNumber, cuisineType, menuItems, rating } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name,ownerEmail, address, phoneNumber, cuisineType, menuItems, rating },
      { new: true, runValidators: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const ownerRestaurant= async (req, res,next) => {
  const ownerId = new  mongoose.Types.ObjectId(req.user.id); // Get ownerId from authenticated token
  try {
      const restaurants = await Restaurant.find({ ownerId });
      res.json(restaurants);
  } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants" });
  }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (req, res,next) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Search for restaurants based on query parameters.
 * @param {Object} searchParams - The parameters to search for (name, cuisineType, rating, etc.).
 * @returns {Promise<Array>} - Returns an array of matching restaurants.
 */
export const searchRestaurants = async (searchParams) => {
  try {
    // Create a dynamic query object based on the searchParams passed in
    const query = {};

    if (searchParams.name) {
      // Using regular expression to search by name (case-insensitive)
      query.name = { $regex: searchParams.name, $options: 'i' };
    }

    if (searchParams.cuisineType) {
      query.cuisineType = searchParams.cuisineType;
    }

    if (searchParams.rating) {
      query.rating = { $gte: searchParams.rating }; // Search for restaurants with a rating greater than or equal to the given value
    }

    if (searchParams.ownerEmail) {
      query.ownerEmail = searchParams.ownerEmail;
    }

    // Fetch restaurants based on the query object
    const restaurants = await Restaurant.find(query).populate('menuItems');
    return restaurants;
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    throw error;
  }
};





