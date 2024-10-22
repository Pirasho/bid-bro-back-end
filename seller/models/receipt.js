const mongoose = require('mongoose')
const receiptSchema = mongoose.Schema({

    image:{
        data:Buffer,
        contentType:String
    },
    product: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sellp: {
        type: String,
        required: true
    },
    daddress: {
        type: String,
        required: true
    },
    dfees: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('receipt', receiptSchema);
