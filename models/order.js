const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true, required: true },
  item_name: { type: String, required: true },
  cost: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  delivery_date: { type: Date, required: true }
});

module.exports = mongoose.model('order', orderSchema);
