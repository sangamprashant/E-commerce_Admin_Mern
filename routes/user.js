const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = mongoose.model("product");
const User = mongoose.model("client");

// Route to get the count of clients
router.get("/api/client/count", async (req, res) => {
  try {
    const clientCount = await User.countDocuments({});
    res.status(200).json( clientCount );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
