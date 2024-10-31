import express from 'express';
import { Cart } from '../models/cartModel.js';
const router = express.Router();
import { Order } from '../models/orderModel.js';
import { sendDynamicEmail } from '../utilities/nodemailer.js';
import { User } from '../models/userModel.js';
import { MenuItem } from '../models/menuModel.js';
// Create a new order
export const createOrder = async (req, res) => {
  try {
    const userId  = req.user;
    const userDetails = await User.findById(userId);
    const cartData = req.body;
    //const cart = await Cart.findOne({ userId: userId }).populate('menus.menuId');
 
    if (!cartData) {
      return res.json({ message: 'cart is empty' });
    }
   
    const totalPrice = cartData.totalPrices;
    const items = cartData.menus;
    console.log(items);
    
    //const { quantity, deliveryAddress, paymentMethod } = req.body;
    //const orderTime = Order.orderDate;
   /*  if (!quantity || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ message: 'All fields required' });
    } */

    const newOrder = new Order({
      customer: userId,
      items:items,
      quantity:1,
      totalPrice:cartData.totalPrices,
      deliveryAddress:userDetails.address,
      paymentMethod:'cash',
      
    });

    const savedOrder = await newOrder.save();
    const newCart = await Cart.findByIdAndDelete(userId);
    const newuser = await User.findById(userId);
    if (!newuser.email) {
      return res.status(400).json({ message: 'User email not found' });
    }
    await sendDynamicEmail(userId,newuser, savedOrder)
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customer'); // Populate customer details
    // .populate('items') // Populate restaurant details
    // Populate menu item details

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an order by ID
export const getOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const cart = await Order.findOne({ userId: user.id }).populate('items');
    if (!cart) {
      return res.json({ message: 'No orders' });
    }
    res.json({success:true, message: "order details fetched", data: cart });
    
    res.status(200).json({success:true},cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order (e.g., status or delivery details)
export const updateOrder = async (req, res, next) => {
  try {
    const { status, quantity, deliveryTime } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, quantity, deliveryTime },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

