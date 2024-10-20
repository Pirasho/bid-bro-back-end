const mongoose = require('mongoose')
const mybidSchema = mongoose.Schema({

    image:{
        data:Buffer,
        contentType:String
    },
    product: {
        type: String,
        required: true
    },
    mrp: {
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
    date: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('mybid', mybidSchema);
