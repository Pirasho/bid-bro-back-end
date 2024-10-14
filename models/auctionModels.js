import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    expectedPrice: { type: Number, required: true },
    noOfUnits: { type: Number, required: true },
    description: { type: String },
    customerId:{ type:String, required: true },
  },
  { timestamps: true }
);

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;