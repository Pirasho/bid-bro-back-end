import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  sellerid: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;