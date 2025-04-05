const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const router = express.Router();

// Route to create/update a profile
router.post('/createProfile', async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from the request body

    const newProfile = new Profile({
      user: userId,
      ownerName: req.body.ownerName,
      shopName: req.body.shopName,
      username: req.body.username,
      emailid: req.body.emailid,
      mobileno: req.body.mobileno,
      address: req.body.address,
      profileImage: req.body.profileImage
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Error creating profile", error });
  }
});

module.exports = router;
