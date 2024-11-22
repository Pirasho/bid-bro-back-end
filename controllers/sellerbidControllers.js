import asyncHandler from "express-async-handler";
import Sellerbid from "../models/sellerbidModels.js";
import Auction from "../models/auctionModels.js";
import Seller from "../models/sellerModel.js";


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
      // Extract fields from request body
      const { bidprice, warrantymonths, specialnote, auctionid, sellerid } = req.body;
  
      // Find the auction by its ID
      const auction = await Auction.findById(auctionid);
      if (!auction) {
        return res.status(404).json({ message: "Auction not found" });
      }
  
      // Create a new bid object
      const newBid = {
        sellerId: sellerid,
        bidAmount: bidprice,
        warrantymonths,
        specialnote,    
      };
  
      // Add the new bid to the bids array in the auction
      auction.bids.push(newBid);
  
      // Save the updated auction
      await auction.save();
  
      // Respond with the updated auction or new bid
      res.status(201).json({ message: "Bid added successfully", newBid });
    } catch (error) {
      res.status(400).json({ message: error.message });
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

        // Find all auctions with the given customerId
        const auctions = await Auction.find({ customerId: id });

        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: 'Auctions not found' });
        }

        // For each auction, find the corresponding bids and only include accepted bids
        const auctionsWithAcceptedBids = await Promise.all(
            auctions.map(async auction => {
                // Filter out bids where "accept" is true
                const acceptedBids = await Promise.all(
                    auction.bids.filter(bid => bid.accept === true).map(async bid => {
                        // Find seller details based on sellerId
                        const seller = await Seller.findById(bid.sellerId).select('name'); // Assuming Seller model contains the seller name
                        return {
                            ...bid.toObject(), // Convert bid to plain object
                            sellerName: seller ? seller.name : 'Unknown Seller' // Add seller name to bid
                        };
                    })
                );

                // Only return auction if there are accepted bids
                if (acceptedBids.length > 0) {
                    return {
                        _id: auction._id,
                        productName: auction.productName,
                        expectedPrice: auction.expectedPrice,
                        noOfUnits: auction.noOfUnits,
                        description: auction.description,
                        customerId: auction.customerId,
                        bids: acceptedBids // Include only accepted bids with seller name
                    };
                }
            })
        );

        // Filter out undefined entries (auctions without accepted bids)
        const filteredAuctions = auctionsWithAcceptedBids.filter(auction => auction);

        if (filteredAuctions.length === 0) {
            return res.status(404).json({ message: 'No accepted bids found' });
        }

        res.status(200).json(filteredAuctions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const getOrderhistroyOneWithCustomerId = asyncHandler(async (req, res) => {
    try {
        const { id,seller_id } = req.params;
        console.log(id);
        // Find all bids with the given customerId
        const bids = await Auction.find({ _id:id });
console.log('bids'+bids);

        // if (!bids || bids.length === 0) {
        //     return res.status(404).json({ message: 'Bids not found' });
        // }

        // // Loop through each bid and fetch the corresponding auction details
        // const bidDetailsWithAuction = await Promise.all(bids.map(async (bid) => {
        //     const auction = await Auction.findById(bid.auctionid); // Fetch related auction details
        //     return {
        //         ...bid.toObject(), // Convert Mongoose document to plain object
        //         auctionDetails: auction ? auction.toObject() : null, // Add auction details to the response
        //     };
        // }));

        // Return the combined bid and auction details
        res.status(200).json(bids);
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