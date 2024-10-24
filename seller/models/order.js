import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
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
    cname: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    sellp: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model('order', OrderSchema);
