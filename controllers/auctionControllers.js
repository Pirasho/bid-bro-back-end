import asyncHandler from "express-async-handler";
import Auction from "../models/auctionModels.js";

const postAllAuction = asyncHandler(async (req, res) => {
    try {
        const newAuction = new Auction(req.body);
        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



const getAllAuction = asyncHandler(async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const getAllAuctionwithid = asyncHandler(async (req, res) => {
    const { id } = req.params; 

    try {
        // Find auctions where customerId matches the provided id
        const auctions = await Auction.find({ customerId: id });

        if (auctions.length > 0) {
            res.status(200).json(auctions); 
        } else {
            res.status(404).json({ message: 'No auctions found for this customer' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getAuctionById = asyncHandler(async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) return res.status(404).json({ message: 'Auction not found' });
        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {
    postAllAuction,
    getAuctionById,
    getAllAuction,
    getAllAuctionwithid
};