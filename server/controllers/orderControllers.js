import express from 'express';
import { Cart } from '../models/cartModel.js';
const router = express.Router();
import {Order} from '../models/orderModel.js';
import { sendDynamicEmail } from '../utilities/nodemailer.js';
// Create a new order
export const createOrder =  async (req, res) => {
  try {
       const {user} = req;
       
        const cart = await Cart.findOne({userId:user.id}).populate('menus.menuId');
        if(!cart){
            return res.json({message : 'cart is empty'});
        }
     const totalPrice = cart.totalPrices;
    const items = cart.menus;
    
      const { quantity, deliveryAddress, paymentMethod,deliveryTime } = req.body;
      const orderTime = Order.orderDate;
     if(!quantity || !deliveryAddress || !paymentMethod ) {
      return res.status(400).json({message : 'All fields required'});
    }
    const newOrder = new Order({
      customer:user.id,
      items,
      quantity,
      totalPrice,
      deliveryAddress,
      paymentMethod,
      orderTime,
      deliveryTime,
    });

    const savedOrder = await newOrder.save();
    await sendDynamicEmail(customer,savedOrder)
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res,next) => {
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
export const getOrder =  async (req, res,next) => {
  try {
    const {user} = req;
    const cart = await Cart.findOne({userId:user.id}).populate('menus.menuId');
    if(!cart){
        return res.json({message : 'cart is empty'});
    }
    res.json({ message :"order details fetched", data :cart});
    const order = await Order.findById(user.id)
      .populate('customer', 'name email')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price');
     // .populate('deliveryPerson', 'name');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order (e.g., status or delivery details)
export const updateOrder =  async (req, res,next) => {
  try {
    const { status, quantity, deliveryTime } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status,quantity, deliveryTime },
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
export const deleteOrder = async (req, res,next) => {
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

