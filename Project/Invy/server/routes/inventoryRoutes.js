const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const authenticateToken = require("../middleware/authMiddleware");

// GET all inventory items for the logged-in user, sorted by staff ID (sid)
router.get("/inventory", authenticateToken, async (req, res) => {
  try {
    const items = await Inventory.find({ user: req.user.userId }).sort({ sid: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory", error: err });
  }
});

// GET specific product by sid
router.get("/inventory/product/:sid", authenticateToken, async (req, res) => {
  try {
    const product = await Inventory.findOne({
      user: req.user.userId,
      sid: req.params.sid,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

// POST - Add new inventory item
router.post("/inventory", authenticateToken, async (req, res) => {
  try {
    const newItem = new Inventory({
      user: req.user.userId,
      sid: req.body.sid, // You may want to generate this or input it manually
      sname: req.body.sname,
      sprice: req.body.sprice,
      squantity: req.body.squantity,
      stotal: req.body.sprice * req.body.squantity,
      sattnd: req.body.sattnd,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item", error: err });
  }
});

// PUT - Update inventory item by ID
router.put("/inventory/:id", authenticateToken, async (req, res) => {
  try {
    const updatedItem = await Inventory.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      {
        sname: req.body.sname,
        sprice: req.body.sprice,
        squantity: req.body.squantity,
        stotal: req.body.sprice * req.body.squantity,
        sattnd: req.body.sattnd,
      },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item", error: err });
  }
});

// DELETE - Remove inventory item by ID
router.delete("/inventory/:id", authenticateToken, async (req, res) => {
  try {
    await Inventory.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err });
  }
});

// PATCH - Deduct inventory quantity after billing
router.patch("/inventory/deduct", authenticateToken, async (req, res) => {
  try {
    const items = req.body.items; // [{ sid, squantity }]
    for (const item of items) {
      await Inventory.findOneAndUpdate(
        { sid: item.sid, user: req.user.userId },
        { $inc: { squantity: -parseInt(item.squantity) } }
      );
    }
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update inventory", error: err });
  }
});

module.exports = router;
