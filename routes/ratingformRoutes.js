import express from 'express';
import { getAllreviews, postAllReview } from '../controllers/ratingformControllers';


const router=express.Router();


router.get('/get' ,getAllreviews  );
router.post('/post' ,postAllReview  );
// router.get('/id/:id' , getProductById );


export default router;

// routes/index.js
const express = require('express');
const { postReview } = require('../controllers/reviewController');

const router = express.Router();

// POST route to handle review submission
router.post('/review', postReview);

module.exports = router;
