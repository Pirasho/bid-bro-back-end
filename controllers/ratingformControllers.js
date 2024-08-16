// controllers/reviewController.js
const Review = require('../models/Review');

// Handle review submission
exports.postReview = async (req, res) => {
  try {
    const { name, rating, description } = req.body;

    // Validate request data
    if (!name || !rating || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newReview = new Review({ name, rating, description });

    await newReview.save();
    res.json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
