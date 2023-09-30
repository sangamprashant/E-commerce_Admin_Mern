const mongoose = require('mongoose');

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});
// Create a model for the hospital data using the schema
const Admin = mongoose.model('React_Admin', ModelSchema);

// Export the Hospital model
module.exports = Admin;