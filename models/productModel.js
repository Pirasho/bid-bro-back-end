import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Product schema and model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  });

  const Product = mongoose.model("Product", productSchema);
export default Product;