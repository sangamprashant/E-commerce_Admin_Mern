const mongoose = require('mongoose');

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:String,
    price:{type:Number,required:true},
    images:[{type:String}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    properties:{type:Object},
}, {
  timestamps: true // This option adds "createdAt" and "updatedAt" fields
});
// Create a model for the hospital data using the schema
const Product = mongoose.model('product', ModelSchema);

// Export the Hospital model
module.exports = Product;