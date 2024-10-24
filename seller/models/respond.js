import mongoose from 'mongoose';

const respondSchema = new mongoose.Schema({
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
    mrp: {
        type: String,
        required: true
    },
    sellp: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
});

export default mongoose.model('Respond', respondSchema);
