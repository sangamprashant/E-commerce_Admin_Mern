const mongoose = require('mongoose');

const orderStatusOptions = ['confirm', 'packing', 'packed', 'shipping', 'out to deliver', 'delivered', 'canceled'];
const returnStatusOptions = ['not_requested', 'requested', 'processing', 'completed'];

const ModelSchema = new mongoose.Schema({
    name: { type: String },
    total: { type: String },
    email: { type: String },
    city: { type: String },
    phone: { type: String },
    APhone: { type: String },
    postalCode: { type: String },
    street: { type: String },
    country: { type: String },
    status: {
        type: String,
        enum: orderStatusOptions,
        default: 'pending',
    },
    paid: { type: Boolean },
    line_items: { type: Object },
    returnStatus: {
        type: String,
        enum: returnStatusOptions,
        default: 'not_requested',
    },
    refundAmount: { type: Number, default: 0 }, // Amount to be refunded for canceled orders
}, {
    timestamps: true 
});

const Order = mongoose.model('order', ModelSchema);

module.exports = Order;
