import asyncHandler from "express-async-handler";

const getAllAuctions = asyncHandler(async (req, res) => {
    try {
      const auction = await Auction.find({});
      if (auction.length === 0) {
        return res.status(404).json({ message: "Auction Details is Empty !" });
      }
      res.status(200).json(auction);
    } catch (err) {
      console.error("Failed to fetch Auction from MongoDB:", err);
      res.status(500).json({ message: err.message });
    }
  });
  