const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const Product = mongoose.model("product");

router.post('/api/products',requireLogin, async (req, res) => {
  try {
    const { title, description, price, images, category, properties } = req.body;

    // Create and save the product
    const product = new Product({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    await product.save();

    // Respond with the saved product
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create a product" });
  }
});

router.get("/api/products",requireLogin, async (req, res) => {
  try {
    const products = await Product.find({isDeleted:false});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

router.put("/api/products/:id",requireLogin, async (req, res) => {
  const { images, title, description, price, category, properties } = req.body;
  const {id} = req.params;
  try {
    await Product.findOneAndUpdate({ _id:id }, { title, description, price, images, category, properties });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update the product" });
  }
});

router.get("/api/products/:id",requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

// Update isDeleted field to true when deleting a product
router.put("/api/products/delete/:id",requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    // Find the product by ID and update the isDeleted field to true
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      { new: true } // To get the updated product document
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to delete the product" });
  }
});


module.exports = router;
