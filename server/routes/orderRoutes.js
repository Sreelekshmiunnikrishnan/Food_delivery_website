const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import the Order model

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { customer, restaurant, items, totalPrice, deliveryAddress, paymentMethod, deliveryPerson } = req.body;
    
    const newOrder = new Order({
      customer,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      paymentMethod,
      deliveryPerson
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email') // Populate customer details
      .populate('restaurant', 'name') // Populate restaurant details
      .populate('items.menuItem', 'name price') // Populate menu item details
      .populate('deliveryPerson', 'name'); // Populate delivery person details if exists
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('restaurant', 'name')
      .populate('items.menuItem', 'name price')
      .populate('deliveryPerson', 'name');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an order (e.g., status or delivery details)
router.put('/:id', async (req, res) => {
  try {
    const { status, deliveryPerson, deliveryTime } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, deliveryPerson, deliveryTime },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
