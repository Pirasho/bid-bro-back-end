import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Customer schema and model
const customerSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
  });
  const Customer = mongoose.model("Customer", customerSchema);
  
  export default User;