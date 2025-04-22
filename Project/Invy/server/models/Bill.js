// models/Bill.js
const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      sid: String,
      sname: String,
      squantity: Number,
      srate: Number,
      stotal: Number,
    }
  ],
  tax: Number,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
