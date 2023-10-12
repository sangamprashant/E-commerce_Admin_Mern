const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: { type: String,},
    total: { type: String,},
    email: { type: String,},
    city: { type: String,},
    phone: { type: String,},
    APhone: { type: String,},
    postalCode: { type: String,},
    street: { type: String,},
    country: { type: String,},
    status:{type:String},
    paid: { type: Boolean,},
    line_items:{type:Object},
}, {
  timestamps: true 
});
const Order = mongoose.model('order', ModelSchema);

module.exports = Order;