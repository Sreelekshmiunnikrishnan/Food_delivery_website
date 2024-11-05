import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";
import { generateToken } from "../utilities/token.js";
import { User } from "../models/userModel.js";;
import {sendRegistrationEmail} from "../utilities/nodemailer.js";
import { Owner } from "../models/ownermodel.js";
const router = express.Router();

export const register = async(req, res,next) => {
  try {
    const { name, email, password,role,address, phoneNumber,profilepic} = req.body;
    if(!name||!email ||!password ||!address||!phoneNumber || !role){
      return res.status(400).json({ error: 'All fields are required' });
    }
    const isAdminExist = await Admin.findOne({ email });
    if (isAdminExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber,
      profilepic
      
    });

    const savedAdmin =  await newAdmin.save();
    await sendRegistrationEmail(email);
    if(savedAdmin){
     const token =  generateToken(savedAdmin._id)
     res.cookie("token",token,{
      sameSite:"None",
      secure:true,
      httpOnly:true,
     });
   return res.status(201).json({ message: 'Admin created successfully' ,savedAdmin});
    // res.status(200).json({message: 'User created successfully',savedUser});
    }
    return res.status(400).json({ error: 'Registration unsucessful' });

 } catch (error) {
     console.log(error);
     res.status(error.status || 500).json({ error: error.message || "Internal server error"});
 }
}

export const adminSignin = async (req, res,next) => {
    try {
      const { email, password } = req.body;
      //console.log(req.body);
      
      if(!email|| !password){
        return res.status(400).json({ message: 'All fields are required' });
      }
      const isAdminExist = await Admin.findOne({email});
      if (!isAdminExist) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, isAdminExist.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Password doesnt match' });
      }
      const token = generateToken(isAdminExist._id,'admin');
      res.cookie("token",token,{
        sameSite:"None",
        secure:true,
        httpOnly:true,
       });
      
      res.json({ message: 'Admin Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

  export const getAdminProfile = async (req, res,next) => {
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

  export const getUserProfile = async (req, res,next) => {
    try {
      const id = req.params.id;
      console.log(id);
      
      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };
  export const getOwnerProfile = async (req, res,next) => {
    try {
      const id = req.params.id;
      console.log(id);
      
      const user = await Owner.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Owner not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };

 
  export const getAllUser = async (req, res,next) => {
    try {
      const user = await User.find().select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Users not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };
  export const getAllOwners = async (req, res,next) => {
    try {
      const user = await Owner.find().select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Owners not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };


  export const logout = (req, res,next) => {
    
    try {
      res.clearCookie('token',{
        sameSite:"None",
        secure:true,
        httpOnly:true,
       });
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
       
};


export const checkAdmin =  async (req, res,next) => {
  try {
   
    res.status(200).json({ success: true, message: "autherized user" });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || 'Internal server error');
  }
};

  export const blockUser =  async (req, res,next) => {
    try {
      const userId = req.params.id;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Check if the user is already blocked
  if (user.isBlocked) {
    return res.status(400).json({ message: 'User is already blocked.' });
  }

  // Update the user's status to blocked
  user.isBlocked = true;
  user.status = "Inactive";
  await user.save();
  
      return res.status(200).json({ message: 'User blocked successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };


  export const unblockUser =  async (req, res,next) => {
    try {
      const userId = req.params.id;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Check if the user is not blocked
  if (!user.isBlocked) {
    return res.status(400).json({ message: 'User is not blocked.' });
  }

  // Update the user's status to unblocked
  user.isBlocked = false;
  user.status = "Active";
  await user.save();
  
      return res.status(200).json({ message: 'User unblocked successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };



  export const unblockOwner =  async (req, res,next) => {
    try {
      const ownerId = req.params.id;

  // Find the user by ID
  const user = await Owner.findById(ownerId);

  if (!user) {
    return res.status(404).json({ message: 'Owner not found.' });
  }

  // Check if the user is not blocked
  if (!user.isBlocked) {
    return res.status(400).json({ message: 'User is not blocked.' });
  }

  // Update the user's status to unblocked
  user.isBlocked = false;
  user.status = "Active";
  await user.save();
  
      return res.status(200).json({ message: 'User unblocked successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };


  export const blockOwner =  async (req, res,next) => {
    try {
      const ownerId = req.params.id;
    
      // Update the user's status to blocked
      const user = await Owner.findByIdAndUpdate(
        ownerId,
        { isBlocked: true }, 
        {status:"Inactive"},
        { new: true }  // Returns the updated user document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Owner not found.' });
      }
  
      return res.status(200).json({ message: 'Owner blocked successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profile', error });
    }
  };
  
  

