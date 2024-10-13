import asyncHandler from "express-async-handler";
import Sellerbid from "../models/sellerbidModels.js";
import Auction from "../models/auctionModels.js";


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


const getSellerbidByauctionId = asyncHandler(async (req, res) => {
    try {
        const{id}=req.params;
        const bid = await Sellerbid.find({auctionid:id});
        if (!bid) return res.status(404).json({ message: 'Bid not found' });
        res.status(200).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getSellerbidBysellerbidId = asyncHandler(async (req, res) => {
    try {
        const{id}=req.params;
        const bid = await Sellerbid.find({_id:id});
        if (!bid) return res.status(404).json({ message: 'Bid not found' });
        res.status(200).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



const postAllSellerbid = asyncHandler(async (req, res) => {
    try {
        // Extract specific fields (sellerName, price, savings, deliveryCharge) from req.body
        const { sellerName, bidprice, mrp, saving, deliveryCharge, warrantymonths, auctionid, specialnote, city } = req.body;
        const auction = await Auction.findById(auctionid);
        let total = (parseFloat(auction.noOfUnits) * parseFloat(bidprice)) + (parseFloat(deliveryCharge));
        const newBid = new Sellerbid({ sellerName, bidprice, mrp, saving, deliveryCharge, warrantymonths, total, specialnote, city });
        await newBid.save();
        res.status(201).json(newBid); // Send the created bid object in the response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Send error message
    }
});

const updateSellerBidWithCustomerId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id } = req.body; 

        // Find the seller bid by ID
        const bid = await Sellerbid.findById(id);

        // Check if the bid exists
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Update the customerId if it exists, or add a new field if not
        if (bid.customerId) {
            // If customerId exists, update it
            bid.customerId = customer_id;
        } else {
            // If customerId does not exist, create a new field
            bid.customerId = customer_id;
        }

        // Save the updated bid
        await bid.save();

        // Respond with the updated bid
        res.status(200).json({ message: 'Seller bid updated successfully', bid });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getOrderhistroyWithCustomerId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Find all bids with the given customerId
        const bids = await Sellerbid.find({ customerId: id });

        if (!bids || bids.length === 0) {
            return res.status(404).json({ message: 'Bids not found' });
        }

        // For each bid, find the corresponding auction details
        const bidDetailsWithAuction = await Promise.all(
            bids.map(async (bid) => {
                const auction = await Auction.findById(bid.auctionid); // Assuming Auction is the model for auction details
                return {
                    ...bid.toObject(), // Convert Mongoose document to plain object
                    auctionDetails: auction // Include auction details
                };
            })
        );

        res.status(200).json(bidDetailsWithAuction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getOrderhistroyOneWithCustomerId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        

        

        // Find all bids with the given customerId
        const bids = await Sellerbid.find({ _id:id });

        if (!bids || bids.length === 0) {
            return res.status(404).json({ message: 'Bids not found' });
        }

        // Loop through each bid and fetch the corresponding auction details
        const bidDetailsWithAuction = await Promise.all(bids.map(async (bid) => {
            const auction = await Auction.findById(bid.auctionid); // Fetch related auction details
            return {
                ...bid.toObject(), // Convert Mongoose document to plain object
                auctionDetails: auction ? auction.toObject() : null, // Add auction details to the response
            };
        }));

        // Return the combined bid and auction details
        res.status(200).json(bidDetailsWithAuction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




/*
const postAllAuction = asyncHandler(async (req, res) => {
    try {
        const newAuction = new Auction(req, body);
        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
*/

export {
    getAllSellerbid,
    getSellerbidById,
    postAllSellerbid,
    getSellerbidByauctionId,
    getSellerbidBysellerbidId,
    updateSellerBidWithCustomerId,
    getOrderhistroyWithCustomerId,
    getOrderhistroyOneWithCustomerId

}