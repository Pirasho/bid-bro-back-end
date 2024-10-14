import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// const SellerBid = require('../models/sellerbidsModel');

// Get all seller bids
const getAllproductCount = asyncHandler (async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.json({ count: productCount });
      } catch (error) {
        console.error('Error fetching product count:', error);
        res.status(500).json({ error: 'Failed to fetch product count' });
      }
});


export {
    getAllproductCount
}