const mongoose = require('mongoose')
const signupSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    shopaddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    document:{
        data:Buffer,
        contentType:String
    },
    
});

module.exports = mongoose.model('signup', signupSchema);
