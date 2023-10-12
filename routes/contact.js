const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const Product = mongoose.model("product");
const Contact = mongoose.model("Contact");
const nodemailer = require('nodemailer');

router.get("/api/responses", requireLogin, async (req, res) => {
  try {
    const responses = await Contact.find({ responsed: false });
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a response by ID
router.get("/api/responses/:id",requireLogin, async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Handle POST request to save a response
router.post('/api/responses/:id', requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const { responseMessage } = req.body;
  
      // Find the contact by ID
      const contact = await Contact.findById(id);
  
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Check if the contact has already been responded to
      if (contact.responsed) {
        return res.status(400).json({ message: 'Contact has already been responded to' });
      }
  
      // Save the response and mark it as responded
      contact.response = responseMessage;
      contact.responsed = true;
      await contact.save();
  
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      // Send an email to the user with both the response and the original message
      const mailOptions = {
        from: `"Kloth" <${process.env.EMAIL}>`,
        to: contact.email,
        subject: 'Response to Your Message',
        text: `Original Message: ${contact.message}\nResponse: ${responseMessage}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({ message: 'Response saved and email sent successfully.' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;
