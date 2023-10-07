const mongoose = require('mongoose');

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String,},
    Aphone: { type: String,},
    image: { type: String,},
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }, // Self-referencing
    carts:[{ type:Object }],
    orders:[{ type:Object }],
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});
// Create a model for the hospital data using the schema
const User = mongoose.model('client', ModelSchema);

// Export the Hospital model
module.exports = User;