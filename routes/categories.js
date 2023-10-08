const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Categories = mongoose.model("categories");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const requireLogin = require("../middleware/requireLogin");

// Signup route
router.post("/api/categories", requireLogin, async (req, res) => {
  try {
    const { name, parentCategory, properties } = req.body;

    // Create and save the category
    const category = new Categories({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    await category.save();

    // Respond with the saved category
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to save the category" });
  }
});

// Get all categories route
router.get("/api/categories", requireLogin, async (req, res) => {
  try {
    const categories = await Categories.find({}).populate("parent");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the categories" });
  }
});

// Update category route
router.put("/api/categories", requireLogin, async (req, res) => {
  try {
    const { name, parentCategory, id, properties } = req.body;

    // Define the update object based on the presence of parentCategory
    const updateObject = parentCategory
      ? { name, parent: parentCategory, properties }
      : { name, $unset: { parent: "" }, properties };

    await Categories.findOneAndUpdate({ _id: id }, updateObject);

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to update the category" });
  }
});
// Get category by ID route
router.get("/api/categories/:categoryId", requireLogin, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Categories.findOne({ _id: categoryId });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the category" });
  }
});

// Delete category by ID route
router.delete("/api/categories/:categoryId", requireLogin, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Categories.findOneAndDelete({
      _id: categoryId,
    });

    if (deletedCategory) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to delete the category" });
  }
});
module.exports = router;
