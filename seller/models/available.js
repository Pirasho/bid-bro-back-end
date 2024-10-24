import mongoose from 'mongoose';

const availableSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
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
    }
});

export default mongoose.model('available', availableSchema);
