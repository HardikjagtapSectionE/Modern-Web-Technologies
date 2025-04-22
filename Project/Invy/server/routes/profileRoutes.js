const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/profile-images";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.userId });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err });
  }
});

// UPDATE profile
router.put("/profile", authenticateToken, upload.single("profileImage"), async (req, res) => {
  try {
    const updates = {
      ownerName: req.body.ownerName,
      shopName: req.body.shopName,
      username: req.body.username,
      mobileno: req.body.mobileno,
      address: req.body.address,
    };

    if (req.body.email) updates.email = req.body.email;
    if (req.file) updates.profileImage = "/uploads/profile-images/" + req.file.filename;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
});

module.exports = router;
