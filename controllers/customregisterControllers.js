import asyncHandler from 'express-async-handler';
import CustomRegister from '../models/customregisterModels.js';
import bcrypt from "bcryptjs";
import {getUserProfileImage, uploadImage} from '../middleware/imageupload.js'


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, address, city, country, zip, password,profileimage} = req.body;
    const userExists = await CustomRegister.findOne({ email });
    console.log( req.body);
    
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        throw new Error('User already exists');
    }
    const user = await CustomRegister.create({ name, email, phone, address, city, country, zip, password,profileimage});
    await uploadImage(req);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileimage: `uploads/${req.body.email}-profile.png`
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
    console.log(user);
    
    if (user && (await bcrypt.compare(password, user.password))) {
       const profilepath=  getUserProfileImage(req);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileUrl:profilepath
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