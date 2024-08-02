import asyncHandler from "express-async-handler";
import Auction from "../models/auctionModels.js";

// auctionController.js
// const Auction = require('../models/auctionModel');


// Get all auctions
const getAllAuction = asyncHandler(async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an auction by ID
const getAuctionById = asyncHandler(async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) return res.status(404).json({ message: 'Auction not found' });
        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Create a new auction
const postAllAuction = asyncHandler(async (req, res) => {
    try {
        const newAuction = new Auction(req.body);
        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// // Update an auction
// exports.updateAuction = async (req, res) => {
//   try {
//     const updatedAuction = await Auction.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedAuction) return res.status(404).json({ message: 'Auction not found' });
//     res.status(200).json(updatedAuction);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


export {

    getAllAuction,
    getAuctionById,
    postAllAuction,


}