import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const SellerbidSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  price: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  
});


const Sellerbid = mongoose.model("Sellerbid", SellerbidSchema);
export default Sellerbid;