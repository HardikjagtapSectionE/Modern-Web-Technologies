const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true 
  },
  ownerName: { type: String, required: true },
  shopName: { type: String, required: true },
  username: { type: String, required: true },
  emailid: { type: String, required: true },
  mobileno: { type: String, required: true },
  address: { type: String, required: true },
  profileImage: { type: String } // relative path to uploaded image
});

module.exports = mongoose.model("Profile", profileSchema);
