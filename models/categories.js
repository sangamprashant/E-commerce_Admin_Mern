const mongoose = require('mongoose');

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "categories" }, // Self-referencing
    properties:[{ type:Object }]
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});
// Create a model for the hospital data using the schema
const Categories = mongoose.model('categories', ModelSchema);

// Export the Hospital model
module.exports = Categories;