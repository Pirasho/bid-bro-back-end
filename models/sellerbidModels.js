import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const SellerbidSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  bidprice: { type: Number, required: true },
  mrp: { type: Number ,required:false},
  saving: { type: Number,required:false},
  deliveryCharge: { type: Number,required:false },
  warrantymonths: { type: Number, required: true },
  total: { type: Number,required:false},
  specialnote: { type: String , required: true },
  city: { type: String  ,required:false},
  auctionid: { type: String,required:false },
  customerId: { type: String ,required:false},
});


const Sellerbid = mongoose.model("Sellerbid", SellerbidSchema);
export default Sellerbid;