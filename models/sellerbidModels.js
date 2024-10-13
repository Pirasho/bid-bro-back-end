import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const SellerbidSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  bidprice: { type: Number, required: true },
  mrp: { type: Number, required: true },
  saving: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  warrantymonths: { type: Number, required: true },
  total: { type: Number, required: true },
  specialnote: { type: String , required: true },
  city: { type: String , required: true },
  auctionid: { type: String },
  customerId: { type: String },
});


const Sellerbid = mongoose.model("Sellerbid", SellerbidSchema);
export default Sellerbid;