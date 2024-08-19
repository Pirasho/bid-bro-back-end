// import asyncHandler from "express-async-handler";
// import Customregister from "../models/customregisterModels";

// // const SellerBid = require('../models/sellerbidsModel');

// // Get all seller bids
// const postAllcustomregister = asyncHandler (async (req, res) => {
//     try {
//         const sellersCount = await Seller.countDocuments();
//         res.json({ count: sellersCount });
//       } catch (error) {
//         console.error('Error fetching sellers count:', error);
//         res.status(500).json({ error: 'Failed to fetch sellers count' });
//       }
// });


// export {
//     postAllcustomregister
// }

import asyncHandler from 'express-async-handler';
import CustomRegister from '../models/customregisterModels.js';
import bcrypt from "bcryptjs";

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, address, city, country, zip, password } = req.body;
    const userExists = await CustomRegister.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        throw new Error('User already exists');
    }
    const user = await CustomRegister.create({ name, email, phone, address, city, country, zip, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
        throw new Error('Invalid user data');
    }
});
// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await CustomRegister.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
        throw new Error('Invalid email or password');
    }
});

export {
    registerUser,
    loginUser
};