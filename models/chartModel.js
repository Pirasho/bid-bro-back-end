import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//chart schema

const salesSchema = new mongoose.Schema({
    productName: String,
    count: Number,
  });
  
  const Sales = mongoose.model('Sales', salesSchema);
  
  export default User;