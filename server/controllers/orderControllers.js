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
    const userId = req.user.id;

    // Fetch user details
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {cartData,sessionId} = req.body;
   
    // Check if cartData is empty or if menus are not present
    if (!cartData || !cartData?.menus || cartData?.menus.length === 0) {
      return res.json({ message: 'Cart is empty' });
    }

    const items = cartData.menus;
    console.log(items);

    
    // Create a new order
    const newOrder = new Order({
      customer: userId,
      items: items,
      quantity: quantity || 1, // Default to 1 if quantity is not provided
      deliveryAddress: deliveryAddress || userDetails.address, // Use provided address or default to user address
      paymentMethod: paymentMethod || 'cash',
      ownerId:sessionId, // Default payment method if not provided
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Remove items from the cart
    await Cart.findByIdAndDelete(userId);

    // Check if the user email exists before sending email
    if (!userDetails.email) {
      return res.status(400).json({ message: 'User email not found' });
    }
    // Send dynamic email with order details
    await sendDynamicEmail(userId, userDetails, savedOrder);

    // Respond with the created order
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
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

