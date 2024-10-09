import express from "express";
import { Restaurant } from "../models/restaurantModel.js";
import e from "express";
const router = e.Router();



// Create a new restaurant
export const create = async (req, res,next) => {
  try {
    const { name,owner,ownerEmail, address, phoneNumber, cuisineType,rating} = req.body;
    console.log(req.body);
    
    if(!name || !address || !phoneNumber || !owner){
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newRestaurant = new Restaurant({
      name,
      owner,
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
    const restaurants = await Restaurant.find().populate('owner');
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a restaurant by ID
export const getRestaurant = async (req, res,next) => {
  try {
    const {id} =req.params;
    const restaurant = await Restaurant.findById(id).populate('owner');
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
    const { name, owner,ownerEmail, address, phoneNumber, cuisineType, menuItems, rating } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, owner,ownerEmail, address, phoneNumber, cuisineType, menuItems, rating },
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


