const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = mongoose.model("product");

router.post('/api/products', async (req, res) => {
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

router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

router.put("/api/products", async (req, res) => {
  const { images, title, description, price, _id, category, properties } = req.body;
  console.log(category);
  try {
    await Product.findOneAndUpdate({ _id }, { title, description, price, images, category, properties });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update the product" });
  }
});

router.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});
router.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to delete the product" });
  }
});


module.exports = router;
