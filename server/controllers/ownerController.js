import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {sendRegistrationEmail} from '../utilities/nodemailer.js';
import {generateToken} from '../utilities/token.js';
import { Owner } from "../models/ownermodel.js";

export const createowner = async(req, res,next) => {
    try {
      const { name, email, password,role,address, phoneNumber,profilePic} = req.body;
      if(!name||!email ||!password ||!address||!phoneNumber){
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingUser = await Owner.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password,salt);
  
      const newOwner = new Owner({
        name,
        email,
        password: hashedPassword,
        role,
        address,
        phoneNumber,
        
      });

      const savedOwner =  await newOwner.save();
      await sendRegistrationEmail(email);
       if(savedOwner){
       const token = generateToken(savedOwner._id)
       res.cookie("token",token,{
        sameSite:"None",
        secure:true,
        httpOnly:true,
       }); 
      
     return res.status(201).json({ message: 'User created successfully' ,savedOwner});
      // res.status(200).json({message: 'User created successfully',savedUser});
      }
      return res.status(400).json({ error: 'Registration unsucessful' });

   } catch (error) {
       console.log(error);
       res.status(error.status || 500).json({ error: error.message || "Internal server error"});
   }
}

export const ownerLogin = async (req, res,next) => {
    try {
      const {email, password} = req.body;
  
      const ownerExists = await Owner.findOne({email});
      if (!ownerExists) {
        return res.status(404).json({message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, ownerExists.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Password doesnt match' });
      }
  
      const token =  generateToken(ownerExists._id,'restaurantOwner');
      res.cookie("token",token,{
        sameSite:"None",
        secure:true,
        httpOnly:true,
       });
      
      res.status(200).json({ message: 'Owner Login successful' });

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message || "Internal server error"});
    }
  };

  export const getOwnerProfile = async (req, res,next) => {
    try {
      const ownerExists = await Owner.findById(req.user.id).select('-password');
      if (!ownerExists) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(ownerExists);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };

  export const updateOwnerProfile = async (req, res,next) => {
    try {
      const { name, address, phoneNumber } = req.body;
      const user = await Owner.findByIdAndUpdate(
        req.user.id,
        { name, address, phoneNumber },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(201).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };

  export const ownerlogout = (req, res,next) => {
    try {
      res.clearCookie('token',{
        sameSite:"None",
        secure:true,
        httpOnly:true,
       });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
       
};

  export const deleteownerProfile =  async (req, res,next) => {
    try {
      // Find and delete the user by ID
      //const user = await User.findByIdAndDelete(req.user.id);
      // Temporarily freezing User
      const user = await Owner.updateOne({_id:req.user.id}, { $set: {status:'Inactive'} });
     
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };
  export const checkOwner =  async (req, res,next) => {
    try {
     
      res.status(200).json({ success: true, message: "autherized user" });
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
  };
  
  

