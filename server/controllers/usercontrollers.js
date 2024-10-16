import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import {generateToken} from '../utilities/token.js';
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { handleImageUpload } from "../utilities/cloudinary.js";
import { sendRegistrationEmail } from "../utilities/nodemailer.js";

/*export const authenticate = (req, res, next) => {
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
  };*/

  export const register = async(req, res,next) => {
    try {
      //let imageUrl;
      
      const { name, email, password,role,address, phoneNumber,profilePic} = req.body;
      
      //if(req.file){
       // const timestamp = Math.round(new Date() /1000);
       // const signature = cloudinaryInstance.utils.api_sign_request(timestamp,process.env.CLOUD_API_SECRET);
       //const cloudinaryRes= await cloudinaryInstance.uploader.upload(req.file.path);
       // imageUrl=cloudinaryRes.url;
      //imageUrl = await handleImageUpload(req.file.path);
        
     //}
     //console.log('===imageurl',imageUrl);
      if(!name||!email ||!password ||!address||!phoneNumber){
        return res.status(400).json({ error: 'All fields are required' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password,salt);
    
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        address,
        phoneNumber,
        profilePic,
      });
 
      const savedUser =  await newUser.save();
      await sendRegistrationEmail(email,name);
      if(savedUser){
       const token = await generateToken(savedUser._id);
       res.cookie("token",token);
     return res.status(201).json({ message: 'User created successfully' ,savedUser});
      // res.status(200).json({message: 'User created successfully',savedUser});
      }
      return res.status(400).json({ error: 'Registration unsucessful' });

   } catch (error) {
       console.log(error);
       res.status(error.status || 500).json({ error: error.message || "Internal server error"});
   }
}

export const login = async (req, res,next) => {
    try {
      const {email, password} = req.body;
  
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password doesnt match' });
      }
  
      const token = await generateToken(user._id);
    res.cookie("token",token);
    return res.status(200).json({ message: "Login sucessful"});

    } catch (error) {
      res.status(error.status || 500).json({ error: error.message || "Internal server error"});
    }
  };

  export const getProfile = async (req, res,next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };

  export const updateProfile = async (req, res,next) => {
    try {
      const { name, address, phoneNumber } = req.body;
      const user = await User.findByIdAndUpdate(
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

  export const logout = (req, res,next) => {
    try {
      res.clearCookie('token');
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
       
};

  export const deleteProfile =  async (req, res,next) => {
    try {
      // Find and delete the user by ID
      //const user = await User.findByIdAndDelete(req.user.id);
      // Temporarily freezing User
      const user = await User.updateOne({_id:req.user.id}, { $set: {status:'Inactive'} });
     
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User profile deleted successfully',user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };
  export const checkUser =  async (req, res,next) => {
    try {
     
       res.json({ message: 'User authorized' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };
  
  

