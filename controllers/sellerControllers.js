import asyncHandler from "express-async-handler";
import Seller from "../models/sellerModel.js";
import {uploadSellerImage} from '../middleware/imageupload.js'
import bcrypt from "bcryptjs";

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

// Register a new user
const postAllseller = asyncHandler(async (req, res) => {
    const { name, email, phone, shop_address, city, country, shop_name, password,profileimage} = req.body;
    const userExists = await Seller.findOne({ email });
    console.log( req.body);
    
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        throw new Error('User already exists');
    }
    const user = await Seller.create({ name, email, phone, shop_address, city, country, shop_name, password,profileimage});
    await uploadSellerImage(req);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileimage: `uploads/seller/${req.body.email}-profile.png`,
            shop_name:user.shop_name
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
        throw new Error('Invalid user data');
    }
});


const loginSeller = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Seller.findOne({ email });
    console.log(user);
    
    if (user && user.password===password ) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profileUrl:`/uploads/seller/${user.email}-profile.png`,
                shop_name:user.shop_name
            });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
        throw new Error('Invalid email or password');
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
    deletesellerById,
    loginSeller
}