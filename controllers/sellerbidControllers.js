import asyncHandler from "express-async-handler";
import Sellerbid from "../models/sellerbidModels.js";


const getAllSellerbid = asyncHandler(async (req, res) => {
    try {
        const bids = await Sellerbid.find();
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific bid by ID
const getSellerbidById = asyncHandler(async (req, res) => {
    try {
        const bid = await Sellerbid.findById(req.params.id);
        if (!bid) return res.status(404).json({ message: 'Bid not found' });
        res.status(200).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const postAllSellerbid = asyncHandler(async (req, res) => {
    try {
        // Extract specific fields (sellerName, price, savings, deliveryCharge) from req.body
        const { sellerName, bidprice,mrp , saving , deliveryCharge ,warrantymonths,total,specialnote , city } = req.body;

        const newBid = new Sellerbid({
            sellerName,
            bidprice,
            mrp,
            saving,
            deliveryCharge,
            warrantymonths,
            total,
            specialnote,
            city
        });

        await newBid.save();
        res.status(201).json(newBid); // Send the created bid object in the response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Send error message
    }
});

export {
    getAllSellerbid,
    getSellerbidById,
    postAllSellerbid

}