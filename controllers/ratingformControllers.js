import asyncHandler from "express-async-handler";
import Review from "../models/ratingformModel.js";

// POST a review
const postAllReview = asyncHandler(async (req, res) => {
  try {
    const { name, rating, description,sellerid } = req.body;
    if (!name || !rating || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const newReview = new Review({ name, rating, description,sellerid });
    await newReview.save();
    res.json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// GET all reviews
const getAllReview = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find();  // Fixed variable name here
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getOneReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({sellerid:id});  // Fixed variable name here
    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export { postAllReview, getAllReview,getOneReview };
