const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: {
    first_name: String,
    last_name: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    phone: String
  },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: String, default: false }
})

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)
module.exports = orderModel
