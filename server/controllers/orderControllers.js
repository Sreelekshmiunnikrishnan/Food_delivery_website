import express from 'express';
import { Cart } from '../models/cartModel.js';
const router = express.Router();
import { Order } from '../models/orderModel.js';
import { sendDynamicEmail } from '../utilities/nodemailer.js';
import { User } from '../models/userModel.js';
import { MenuItem } from '../models/menuModel.js';
// Create a new order
export const createOrder = async (req, res, next) => {
  try {
      const userId = req.user.id;
      const { items, ownerId } = req.body;

      // Fetch user details
      const userDetails = await User.findById(userId);
      if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (!Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ message: 'Items array is required and cannot be empty' });
      }

      const orderItems = items.map(item => ({
         // Ensure this matches the ID of the MenuItem in your database
          menuName: item.menuName, // Product name
          price: item.price, // Already in the correct format
      }));

      // Create a new order
      const newOrder = new Order({
          userId,
          items: orderItems,
          ownerId,
          status: 'completed', // Adjust based on your payment status
          quantity: items.length, // Total quantity based on items
      });

      const savedOrder = await newOrder.save();
      await Cart.deleteMany({ userId: userId });
      if (!userDetails.email) {
          return res.status(400).json({ message: 'User email not found' });
      }

      // Send dynamic email with order details
      await sendDynamicEmail(userId, userDetails, savedOrder);
      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order', error: error.message });
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
    res.status(200).json({success:true, message: "order details fetched", data: cart });
    
    //res.status(200).json({success:true},cart);
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

