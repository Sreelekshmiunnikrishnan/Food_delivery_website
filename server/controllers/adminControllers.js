import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";
const router = express.Router();

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'Token is required' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  export const register = async(req, res) => {
    try {
      const { name, email, password, role, address, phoneNumber } = req.body;
      if(!name||!email ||!password ||!role ||!address||!phoneNumber){
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        address,
        phoneNumber
      });

      await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Create JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

  export const getProfile = async (req, res) => {
    try {
      const user = await Admin.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };

  export const updateProfile = async (req, res) => {
    try {
      const { name, address, phoneNumber } = req.body;
      const user = await Admin.findByIdAndUpdate(
        req.user.id,
        { name, address, phoneNumber },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };

  export const logout = (req, res) => {
    
    res.json({ message: 'Logout successful' });
  };

  export const deleteProfile =  async (req, res) => {
    try {
      // Find and delete the user by ID
      const user = await Admin.findByIdAndDelete(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };
  
  

