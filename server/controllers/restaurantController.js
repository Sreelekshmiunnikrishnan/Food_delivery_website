import express from "express";

import e from "express";
const router = e.Router();

const Restaurant = require('../models/Restaurant'); // Import the Restaurant model

// Create a new restaurant
export const create = async (req, res) => {
  try {
    const { name, owner, address, phoneNumber, cuisineType, menuItems } = req.body;
    const newRestaurant = new Restaurant({
      name,
      owner,
      address,
      phoneNumber,
      cuisineType,
      menuItems
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('owner').populate('menuItems');
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a restaurant by ID
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner').populate('menuItems');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a restaurant by ID
export const updateRestaurant = async (req, res) => {
  try {
    const { name, owner, address, phoneNumber, cuisineType, menuItems, rating } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, owner, address, phoneNumber, cuisineType, menuItems, rating },
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
export const deleteRestaurant = async (req, res) => {
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


