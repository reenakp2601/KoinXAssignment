const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    priceInINR: Number,
});
  
module.exports = mongoose.model('Price', priceSchema);