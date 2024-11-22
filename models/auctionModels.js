// import mongoose from "mongoose";

// const auctionSchema = new mongoose.Schema(
//   {
//     productName: { type: String, required: true },
//     expectedPrice: { type: Number, required: true },
//     noOfUnits: { type: Number, required: true },
//     description: { type: String },
//     customerId:{ type:String, required: true },
//   },
//   { timestamps: true }
// );

// const Auction = mongoose.model('Auction', auctionSchema);

// export default Auction;
import mongoose from 'mongoose';

// Define the Bid Schema
const bidSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  bidAmount: { type: String, required: true },
  warrantymonths: { type: Number },
  specialnote: { type: String },
  accept: { type: Boolean, default: false },
});

// Define the Auction Schema
const auctionSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    expectedPrice: { type: Number, required: true },
    noOfUnits: { type: Number, required: true },
    description: { type: String },
    customerId: { type: String, required: true },
    bids: [bidSchema] 
  },
  { timestamps: true }
);

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
