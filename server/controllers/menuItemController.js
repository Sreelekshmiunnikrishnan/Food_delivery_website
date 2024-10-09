import express from "express";

import e from "express";
const router = e.Router();

export const createMenu = async (req, res,next) => {
  try {
    const { restaurant, name, description, price, imageUrl, available } = req.body;
    
    if(!name||!restaurant||!price ){
        return res.status(400).json({ error: 'All fields are required' });
      }
    const newMenuItem = new MenuItem({
      restaurant,
      name,
      description,
      price,
      imageUrl,
      available
    });
    
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMenuItems = async (req, res,next) => {
  try {
    const menuItems = await MenuItem.find().populate('restaurant'); // Populates the restaurant field
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMenu = async (req, res,next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');
    
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
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
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

