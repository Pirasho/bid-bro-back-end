import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Auction schema and model

const auctionSchema = new mongoose.Schema({
  product: { type: String, required: true },
  noOfUnits: { type: Number, required: true },
  biddingSpan: { type: String, required: true, enum: ['Local', 'District', 'National'] }, // Select options
  email: { type: String, required: true },
  address: { type: String, required: true },
  pickUpOrDelivery: { type: String, required: true, enum: ['Pick-Up', 'Delivery'] }, // Radio options
  color: { type: String },
  expectedPrice: { type: Number },
  description: { type: String }
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;