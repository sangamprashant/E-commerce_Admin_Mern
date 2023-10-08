const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Admin = mongoose.model("React_Admin");
const Order = mongoose.model("order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const requireLogin = require("../middleware/requireLogin");

// Validate that the provided status is a valid order status
const validStatuses = [
  "confirm",
  "packing",
  "packed",
  "shipping",
  "out to deliver",
  "delivered",
  "canceled",
];

// Define an API endpoint to retrieve orders by status
router.get(
  "/api/orders/get/by/status/:status",
  requireLogin,
  async (req, res) => {
    try {
      const { status } = req.params;

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Retrieve orders with the specified status
      const orders = await Order.find({ status });

      // Return the orders as JSON
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Define an API endpoint to retrieve counts of orders by status
router.get("/api/orders/count/by/status", requireLogin, async (req, res) => {
  try {
    const counts = {};
    for (const status of validStatuses) {
      const count = await Order.countDocuments({ status });
      counts[status] = count;
    }
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Define a PUT API endpoint to update the order status by orderId
router.put("/api/orders/update-status/:orderId", requireLogin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      // Update the order status by orderId
      await Order.findByIdAndUpdate(orderId, { status });
  
      res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
