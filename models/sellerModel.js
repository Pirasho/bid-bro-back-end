import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Seller schema and model
const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
  });
  
  const Seller = mongoose.model("Seller", sellerSchema);
  export default User;