import asyncHandler from "express-async-handler";
import Seller from "../models/sellerModel.js";

// const SellerBid = require('../models/sellerbidsModel');

// Get all seller bids
const getAllsellersCount = asyncHandler (async (req, res) => {
    try {
        const sellersCount = await Seller.countDocuments();
        res.json({ count: sellersCount });
      } catch (error) {
        console.error('Error fetching sellers count:', error);
        res.status(500).json({ error: 'Failed to fetch sellers count' });
      }
});


export {
    getAllsellersCount
}