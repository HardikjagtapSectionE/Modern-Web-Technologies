const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const Bill = require("../models/Bill");
const Inventory = require("../models/Inventory");

// Save new bill and update inventory
router.post("/billing", authenticateToken, async (req, res) => {
  try {
    const { name, email, items, tax, totalAmount } = req.body;

    // Save the bill
    const bill = new Bill({
      user: req.user.userId,
      name,
      email,
      items,
      tax,
      totalAmount,
    });

    await bill.save();

    // Update inventory for each item
    for (const item of items) {
      const inventoryItem = await Inventory.findOne({
        sname: item.sname,
        user: req.user.userId,
      });

      if (inventoryItem) {
        const newQty = inventoryItem.squantity - parseInt(item.squantity);

        // Prevent negative stock
        inventoryItem.squantity = newQty < 0 ? 0 : newQty;
        inventoryItem.stotal = inventoryItem.squantity * inventoryItem.sprice;

        await inventoryItem.save();
      }
    }

    res.status(201).json({ message: "Bill saved and inventory updated!" });
  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({ message: "Failed to save bill or update inventory", error });
  }
});

module.exports = router;
