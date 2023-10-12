const mongoose = require('mongoose');

// Define a schema for hospital data
const ModelSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures emails are not duplicated
        // You can add more validations, like email format
      },
      subscribedAt: {
        type: Date,
        default: Date.now, // Timestamp for when the subscription was made
      },
    })
// Create a model for the hospital data using the schema
const Subscription = mongoose.model('subscription', ModelSchema);

// Export the Hospital model
module.exports = Subscription;