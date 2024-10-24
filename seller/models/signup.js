import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
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
    document: {
        data: Buffer,
        contentType: String
    }
});

export default mongoose.model('Signup', signupSchema);
