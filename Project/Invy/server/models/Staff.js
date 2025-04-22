const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sid: { type: String, required: true },
  sname: { type: String, required: true },
  sattnd: { type: String, required: true }, // You can use Date if preferred
}, {
  timestamps: true
});

module.exports = mongoose.model("Staff", staffSchema);
