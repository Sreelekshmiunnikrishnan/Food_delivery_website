import express from "express";
import {cloudinaryInstance} from '../config/cloudinaryConfig.js';
import e from "express";
import { MenuItem } from "../models/menuModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import dotenv from 'dotenv';
dotenv.config();

const router = e.Router();

export const createMenu = async (req, res,next) => {
  try {
    let imageUrl;
    const ownerId = req.user.id;
    
    const { restaurantName,restaurantId, name, description, price,available,image} = req.body;
    if(!name || !price || !restaurantName){
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log('===cloud name',process.env.CLOUD_NAME);
    
    if (req.file) {
      const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl= cloudinaryRes.url;
    }
    console.log('===image url',imageUrl);
    
    const newMenuItem = new MenuItem({
      restaurantName,
      ownerId,
      restaurantId,
       name,
      description,
      price,
      image:imageUrl,
      available,
    });
    
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
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
    const { restaurantName,restaurantId, name, description, price,available,image} = req.body;
    if (req.file) {
      const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl= cloudinaryRes.url;
    }
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.user.id, {restaurantName,restaurantId, name, description, price,available,image:imageUrl}, { new: true });
    
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

