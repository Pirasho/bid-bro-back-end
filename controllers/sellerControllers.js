import asyncHandler from "express-async-handler";
import Seller from "../models/sellerModel.js";

const getAllseller = asyncHandler(async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        console.error("Error fetching sellers:", error);
        res.status(500).json({ error: error.message });
    }
});
const getsellerById = asyncHandler(async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        res.status(200).json(seller);
    } catch (error) {
        console.error("Error fetching seller by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const postAllseller = asyncHandler(async (req, res) => {
    try {
        const { name, email, telephone, address, nic } = req.body;
        console.log("Incoming request body:", req.body);
        if (!name || !email || !telephone || !address || !nic) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const seller = new Seller({ name, email, telephone, address, nic });
        await seller.save();
        console.log("Seller added successfully:", seller);
        res.status(201).json(seller);
    } catch (error) {
        console.error("Error adding seller:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});


const putsellerById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSeller) {
          return res.status(404).json({ error: "Seller not found" });
        }
        res.status(200).json(updatedSeller);
      } catch (error) {
        console.error("Error updating seller:", error);
        res.status(400).json({ error: "Bad request" });
      }
});

const deletesellerById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSeller = await Seller.findByIdAndDelete(id);
        if (!deletedSeller) {
          return res.status(404).json({ error: "Seller not found" });
        }
        res.status(200).json({ message: "Seller deleted successfully" });
      } catch (error) {
        console.error("Error deleting seller:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});

export {
    getAllseller,
    getsellerById,
    postAllseller,
    putsellerById ,
    deletesellerById
}