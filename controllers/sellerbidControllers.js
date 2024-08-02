import asyncHandler from "express-async-handler";
import Sellerbid from "../models/sellerbidModels.js";

// const SellerBid = require('../models/sellerbidsModel');
// Get all seller bids

const getAllSellerbid = asyncHandler (async (req, res) => {
    try {
        const bids = await Sellerbid.find();
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific bid by ID
const  getSellerbidById = asyncHandler( async (req, res) => {
    try {
        const bid = await Sellerbid.findById(req.params.id);
        if (!bid) return res.status(404).json({ message: 'Bid not found' });
        res.status(200).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const  postAllSellerbid = asyncHandler( async (req, res) => {
    try {
        // Extract specific fields (sellerName, price, savings, deliveryCharge) from req.body
        const { sellerName, price, savings, deliveryCharge } = req.body;
    
        // Validate data if necessary (optional)
    
        // Create a new SellerBid with extracted data
        const newBid = new Sellerbid({
          sellerName,
          price,
          savings,
          deliveryCharge,
        });
    
        await newBid.save();
        res.status(201).json(newBid); // Send the created bid object in the response
      } catch (error) {
        res.status(400).json({ message: error.message }); // Send error message
      }
});



// Create a new bid
// exports.createBid = async (req, res) => {
//     const { sellerName, price, savings, deliveryCharge } = req.body;

//     try {
//         const newBid = new SellerBid({
//             sellerName,
//             price,
//             savings,
//             deliveryCharge
//         });
//         await newBid.save();
//         res.status(201).json(newBid);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update an existing bid
// exports.updateBid = async (req, res) => {
//     try {
//         const updatedBid = await SellerBid.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedBid) return res.status(404).json({ message: 'Bid not found' });
//         res.status(200).json(updatedBid);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a bid
// exports.deleteBid = async (req, res) => {
//     try {
//         const deletedBid = await SellerBid.findByIdAndDelete(req.params.id);
//         if (!deletedBid) return res.status(404).json({ message: 'Bid not found' });
//         res.status(200).json({ message: 'Bid deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export {
    getAllSellerbid ,
    getSellerbidById ,
    postAllSellerbid

}