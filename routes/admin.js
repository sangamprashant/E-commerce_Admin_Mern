const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Admin = mongoose.model("React_Admin");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
const bcrypt = require("bcrypt");

// Signup route
router.post("/create/admin",requireLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash and salt the password
    const saltRounds = 10; // Number of salt rounds, higher is more secure
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin with the hashed password
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/api/admin/do/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    // If the admin does not exist, return an error
    if (!admin) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JWT token with the admin's ID as the payload
    const token = jwt.sign({ adminId: admin._id }, process.env.AUTH_SECRET);

    // Send the token and admin details as a response
    res.status(200).json({
      message: "Login successful",
      token: token,
      details: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update Email route
router.put("/api/admin/update/email",requireLogin, async (req, res) => {
  try {
    const { oldEmail, newEmail, password } = req.body;

    const {_id} = req.user;
    const adminVerifiy = await Admin.findById(_id);
    if(!adminVerifiy){
      return res.status(404).json({ message: "Please Login first." });
    }
    if(adminVerifiy.email!==oldEmail){
      return res.status(404).json({ message: "Old Email do not match." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, adminVerifiy.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Update the admin's email
    adminVerifiy.email = newEmail;
    await adminVerifiy.save();

    res.status(200).json({ message: "Email updated successfully",user:adminVerifiy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Password route
router.put("/api/admin/update/password",requireLogin, async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const {_id} = req.user;
    const adminVerifiy = await Admin.findById(_id);
    if(!adminVerifiy){
      return res.status(404).json({ message: "Please Login first." });
    }
    if(adminVerifiy.email!==email){
      return res.status(404).json({ message: "Email do not match." });
    }

    // Compare the provided old password with the hashed password
    const isPasswordValid = await bcrypt.compare(oldPassword, adminVerifiy.password);

    // If the old password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Hash and salt the new password
    const saltRounds = 10; // Number of salt rounds, higher is more secure
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the admin's password
    adminVerifiy.password = hashedPassword;
    await adminVerifiy.save();

    res.status(200).json({ message: "Password updated successfully" ,user:adminVerifiy});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
