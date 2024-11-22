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

const getAllBidsByAuctionId = asyncHandler(async (req, res) => {
    try {
      const { auctionid } = req.params;
  
      // Find the auction by its ID
      const auction = await Auction.find({ _id:auctionid }); 
      if (!auction) {
        return res.status(404).json({ message: "Auction not found" });
      }
  
      // Return the bids for the auction
      res.status(200).json(auction.bids);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Function to update the 'accept' field of a specific bid
const updateBidAcceptStatus = async (req, res) => {

    try {
        const {auctionId, sellerId}=req.params;
        // Find the auction by ID and update the bid with the matching sellerId
        const updatedAuction = await Auction.findOneAndUpdate(
          { _id: auctionId, "bids.sellerId": sellerId }, // Match auctionId and sellerId
          { $set: { "bids.$.accept": true } },  // Update the 'accept' field for the matched bid
          { new: true }  // Return the updated document
        );
    
        if (!updatedAuction) {
          return res.status(404).json({ message: 'Auction or bid not found' });
        }
    
        res.status(200).json(updatedAuction);  // Return the updated auction document
      } catch (error) {
        console.error("Error updating bid accept status:", error);
        res.status(500).json({ error: 'Server error while updating bid' });
      }
  };
  

export {
    postAllAuction,
    getAuctionById,
    getAllAuction,
    getAllAuctionwithid,
    getAllBidsByAuctionId,
    updateBidAcceptStatus
};