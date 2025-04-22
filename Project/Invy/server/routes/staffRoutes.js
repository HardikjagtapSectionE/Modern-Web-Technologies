const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");
const authenticateToken = require("../middleware/authMiddleware");

// GET all staff for logged-in user
router.get("/staff", authenticateToken, async (req, res) => {
  try {
    const staff = await Staff.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch staff", error: err });
  }
});

// POST - Add new staff
router.post("/staff", authenticateToken, async (req, res) => {
  try {
    const newStaff = new Staff({
      user: req.user.userId,
      sid: req.body.sid,
      sname: req.body.sname,
      sattnd: req.body.sattnd
    });

    const saved = await newStaff.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add staff", error: err });
  }
});

// PUT - Update staff by ID
router.put("/staff/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Staff.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      {
        sname: req.body.sname,
        sattnd: req.body.sattnd
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update staff", error: err });
  }
});

// DELETE - Remove staff by ID
router.delete("/staff/:id", authenticateToken, async (req, res) => {
  try {
    await Staff.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete staff", error: err });
  }
});

module.exports = router;
