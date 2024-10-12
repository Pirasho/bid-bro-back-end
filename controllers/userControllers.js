// import CustomRegister from '../models/customregisterModels.js';
// const getUserDetails = asyncHandler(async (req, res) => {
//     const { id } = req.body;
//     const userdetails = await CustomRegister.findOne({_id:id });
//     console.log(userdetails);
    
//         // res.status(401).json({ message: 'Invalid email or password' });
//         // throw new Error('Invalid email or password');

// });


// export {
//     getUserDetails,
// }

import asyncHandler from "express-async-handler";
import CustomRegister from '../models/customregisterModels.js';

// Get user details by ID
const getUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    console.log('id'+id);
    
    const userdetails = await CustomRegister.findById(id);

    if (userdetails) {
        res.json(userdetails);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update user details
const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, city, zip,country,profileimage} = req.body; 
console.log('id'+id);

    // Find user by ID
    const user = await CustomRegister.findById(id);

    if (user) {
        
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.city = city || user.city;
        user.zip = zip || user.zip;
        user.country= country || user.country;
        user.profileimage = profileimage || user.profileimage;


        const updatedUser = await user.save(); 

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            city: updatedUser.city,
            zipCode: updatedUser.zipCode,
            profileimage:updatedUser.profileimage,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    getUserDetails,
    updateUserDetails,
};
