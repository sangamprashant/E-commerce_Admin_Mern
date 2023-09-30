const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Admin = mongoose.model("React_Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email is already registered
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Hash and salt the password
      const saltRounds = 10; // Number of salt rounds, higher is more secure
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new admin with the hashed password
      const newAdmin = new Admin({ email, password: hashedPassword});
      await newAdmin.save();
  
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Login route
router.post('/api/admin/do/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the admin by email
      const admin = await Admin.findOne({ email });
  
      // If the admin does not exist, return an error
      if (!admin) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, admin.password, );
  
      // If the password is invalid, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Create a JWT token with the admin's ID as the payload
      const token = jwt.sign({ adminId: admin._id }, 'your-secret-key');
  
      // Send the token and admin details as a response
      res.status(200).json({
        message: 'Login successful',
        token: token,
        details:admin,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;