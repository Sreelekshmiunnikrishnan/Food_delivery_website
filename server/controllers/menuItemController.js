import express from "express";
import {cloudinaryInstance} from '../config/cloudinaryConfig.js';
import e from "express";
import { MenuItem } from "../models/menuModel.js";
import mongoose from "mongoose";
import { Restaurant } from "../models/restaurantModel.js";
import dotenv from 'dotenv';
dotenv.config();

const router = e.Router();

export const createMenu = async (req, res,next) => {
  try {
    let imageUrl;
    const ownerId = req.user.id;

    // Destructure the fields from req.body
    const { restaurantName, restaurantId, name, description, price, available } = req.body;

    // Validate required fields
    if (!name || !price || !restaurantName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if file was uploaded
    if (req.file) {
      // Check if req.file.path exists
      if (!req.file.path) {
        return res.status(400).json({ error: 'File path not found' });
      }

      // Upload the image to Cloudinary
      const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: 'FoodOrder', // Optional: specify a folder on Cloudinary
      });

      imageUrl = cloudinaryRes.secure_url; // Use secure_url for HTTPS
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Log the image URL for debugging
    console.log('===image url', imageUrl);

    // Create a new menu item
    const newMenuItem = new MenuItem({
      restaurantName,
      ownerId,
      restaurantId,
      name,
      description,
      price,
      image: imageUrl,
      available,
    });

    // Save the new menu item to the database
    const savedMenuItem = await newMenuItem.save();

    // Respond with the created menu item
    res.status(201).json(savedMenuItem);
  } catch (error) {
    console.error('Error creating menu item:', error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
};


export const getMenuItems = async (req, res,next) => {
  try {
    const menuItems = await MenuItem.find(); // Populates the restaurant field
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const ownerMenu= async (req, res,next) => {
  const ownerId = new  mongoose.Types.ObjectId(req.user.id); // Get ownerId from authenticated token
  try {
      const menus = await MenuItem.find({ ownerId });
      res.json(menus);
  } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants" });
  }
};


export const getMenu = async (req, res,next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'MenuItem not found' });
    }

    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   PUT /menu-items/:id
// @desc    Update a menu item by ID
export const updateMenu = async (req, res,next) => {
  try {
    let imageUrl;
    const { restaurantName,restaurantId, image,name, description, price} = req.body;
    if (req.file) {
      // Check if req.file.path exists
      if (!req.file.path) {
        return res.status(400).json({ error: 'File path not found' });
      }

      // Upload the image to Cloudinary
      const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: 'FoodOrder', // Optional: specify a folder on Cloudinary
      });

      imageUrl = cloudinaryRes.secure_url; // Use secure_url for HTTPS
    } else {
      return res.status(400).json({ error: 'Image is required' });
    }
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, {restaurantName,restaurantId, name, description, price,image:imageUrl}, { new: true });
    
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'MenuItem not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   DELETE /menu-items/:id
// @desc    Delete a menu item by ID
export const deleteMenu =  async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'MenuItem not found' });
    }

    res.status(200).json({ message: 'MenuItem deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

