import express from 'express';
import { getAllReview, postAllReview } from '../controllers/ratingformControllers.js';  // Ensure .js is included

const router = express.Router();

router.get('/get', getAllReview);
router.post('/post', postAllReview);

export default router;


// routes/index.js
// const express = require('express');
// const { postReview } = require('../controllers/reviewController');

// const router = express.Router();

// // POST route to handle review submission
// router.post('/review', postReview);

// module.exports = router;
