
import mongoose from "mongoose";
const availableSchema = mongoose.Schema({

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
    }
    
});

const Available = mongoose.model("available", availableSchema);
  
export default Available;