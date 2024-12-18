import express from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Admin } from "../models/adminModel.js";
import { Owner } from "../models/ownermodel.js";
import { generateToken } from '../utilities/token.js';
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { handleImageUpload } from "../utilities/cloudinary.js";
import { sendRegistrationEmail } from "../utilities/nodemailer.js";



export const register = async (req, res, next) => {
  try {
    //let imageUrl;

    const { name, email, password, role, address, phoneNumber, profilePic } = req.body;

    //if(req.file){
    // const timestamp = Math.round(new Date() /1000);
    // const signature = cloudinaryInstance.utils.api_sign_request(timestamp,process.env.CLOUD_API_SECRET);
    //const cloudinaryRes= await cloudinaryInstance.uploader.upload(req.file.path);
    // imageUrl=cloudinaryRes.url;
    //imageUrl = await handleImageUpload(req.file.path);

    //}
    //console.log('===imageurl',imageUrl);
    if (!name || !email || !password || !address || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber,
      profilePic,
    });

    const savedUser = await newUser.save();
    await sendRegistrationEmail(email, name);
    if (savedUser) {
      const token = generateToken(savedUser._id);
      res.cookie("token", token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
      });

      return res.status(201).json({ success: true, message: 'User created successfully', savedUser });
      // res.status(200).json({message: 'User created successfully',savedUser});
    }
    return res.status(400).json({ error: 'Registration unsucessful' });

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if ( user.status === "Inactive") {
      // Update the user to unblock and activate their account
      await User.findByIdAndUpdate(user._id, { status: "Active" });
    } else if (user.isBlocked && user.status === "Blocked") {
      // If the user is blocked but not inactive, prevent login
      return res.status(403).json({ message: "Your account is blocked. Please contact support." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password doesnt match' });
    }
    /*  if (user.status === 'Inactive' && user.isBlocked === true) {
       user.status = 'Active';
       user.isBlocked = false;
       await user.save();
     } */

    const token = generateToken(user._id);

    res.cookie("token", token, {

      sameSite: "None",
      secure: true,
      httpOnly: true,



    });


    return res.status(200).json({ success: true, message: "Login sucessful" });

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const {email,password,conpass} = req.body;
    if (password !== conpass) {
      return res.status(400).send("Passwords do not match");
    }
    let user = await User.findOne({ email });
    if (user) {
      
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return res.status(200).send("Password updated successfully");
    }
  
    // Check the email in the Owner model
    let owner = await Owner.findOne({ email });
    if (owner) {
      
      // Hash new password and save
      owner.password = await bcrypt.hash(password, 10);
      await owner.save();
      return res.status(200).send("Password updated successfully");
    }
  
    // Check the email in the Admin model
    let admin = await Admin.findOne({ email });
    if (admin) {
     
      
      // Hash new password and save
      admin.password = await bcrypt.hash(password, 10);
      await admin.save();
      return res.status(200).send("Password updated successfully");
    }
  
    // If email is not found in any model
    return res.status(404).send("Email not found in any model");
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Internal Server Error");
    
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, message: "user profile fetched", user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, address, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, address, phoneNumber },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

export const logout = (req, res, next) => {
  try {

    res.clearCookie('token', {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    res.json({ success: true, message: "user logged out" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')
  }

};

export const deleteProfile = async (req, res, next) => {
  try {
    // Find and delete the user by ID
    //const user = await User.findByIdAndDelete(req.user.id);
    // Temporarily freezing User
    const user = await User.updateOne({ _id: req.user.id }, { $set: { status: 'Inactive' } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.clearCookie('token', {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.json({ success: true, message: 'User profile deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
};
export const checkUser = async (req, res, next) => {
  try {

    res.status(200).json({ success: true, message: "autherized user" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')
  }

};



