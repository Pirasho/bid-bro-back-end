import mongoose from "mongoose";

// Seller schema and model
const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  shop_address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  shop_name: { type: String, required: true },
  password: { type: String, required: true },
  profileimage: { type: String,required: true }
}, {
  timestamps: true
});

  
  const Seller = mongoose.model("Seller", sellerSchema);

  export default Seller;