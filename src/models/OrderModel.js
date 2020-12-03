const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    table: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PREPARING', 'DONE'],
        default: 'PENDING',
    },
});

module.exports = mongoose.model('Order', OrderSchema);