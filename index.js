const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order');

const app = express();
app.use(express.json());

// Connect to your MongoDB database (update the URL)
mongoose.connect('mongodb://0.0.0.0:27017/eCommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD operations

// Create a new order
app.post('/orders/create', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Duplicate order_id. Please use a different order_id.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Update the order based on order ID
app.post('/orders/update', async (req, res) => {
  const { order_id, delivery_date } = req.body;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: order_id },
      { delivery_date: delivery_date }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all orders for a given date
app.get('/orders/list', async (req, res) => {
  const { date } = req.query;
  try {
    const orders = await Order.find({ order_date: new Date(date) });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Query for a specific order with Order ID
app.all('/orders/search', async (req, res) => {
  const { order_id } = req.method === 'GET' ? req.query : req.body;
  try {
    const order = await Order.findOne({ order_id: order_id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order with Order ID
app.delete('/orders/delete', async (req, res) => {
  const { order_id } = req.body;
  try {
    const deletedOrder = await Order.findOneAndDelete({ order_id: order_id });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
