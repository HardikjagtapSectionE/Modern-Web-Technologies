const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sname: { type: String, required: true },     // Product name
  sprice: { type: Number, required: true },    // Price
  squantity: { type: Number, required: true }, // Quantity
  stotal: { type: Number, required: true },    // Total = price * quantity
  sattnd: { type: String, required: true },    // Expiry date (as string or Date)
}, {
  timestamps: true
});

module.exports = mongoose.model("Inventory", inventorySchema);
