import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
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
    }
});

export default mongoose.model('receipt', receiptSchema);
