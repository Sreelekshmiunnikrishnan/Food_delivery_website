import express from 'express';
import { Cart } from '../models/cartModel.js';
import { Order } from '../models/orderModel.js';
import { sendDynamicEmail } from '../utilities/nodemailer.js';
import { User } from '../models/userModel.js';

const router = express.Router();

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderData } = req.body;

    const items = orderData.items;
    const orderId = orderData.orderId;

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include items' });
    }

    const orderItems = items.map(item => ({
      menuName: item.menuName,
      price: item.price,
    }));
    
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const newOrder = new Order({
      userId,
      items: orderItems,
      orderId,
      status: 'completed',
      quantity: totalQuantity,
    });

    const savedOrder = await newOrder.save();
    await Cart.deleteMany({ userId });

    if (!userDetails.email) {
      return res.status(400).json({ message: 'User email not found' });
    }

    await sendDynamicEmail(userId, userDetails, savedOrder);
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders for a user
export const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate('items');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllOrders = async (req, res, next) => {
  try {
   
    const orders = await Order.find().populate('items');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific order by ID
export const getOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const order = await Order.findOne({ userId: user.id, _id: req.params.id }).populate('items');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: "Order details fetched", order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an order
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

    res.status(200).json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
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
    console.error('Error deleting order:', error);
    res.status(500).json({ message: error.message });
  }
};
