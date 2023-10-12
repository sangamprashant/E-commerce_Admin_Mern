const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const Product = mongoose.model("product");
const Subscription = mongoose.model("subscription");

// Route to get the count of clients
router.get("/api/subscription/count",requireLogin, async (req, res) => {
  try {
    const clientCount = await Subscription.countDocuments({});
    res.status(200).json( clientCount );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
