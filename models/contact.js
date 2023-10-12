const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  responsed:{
    type:Boolean,
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
