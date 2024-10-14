// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// // Customer schema and model
// const customregisterSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     telephone: { type: String, required: true },
//     address: { type: String, required: true },
//     address: { type: String, required: true },
//     regNo: { type: String, required: true, unique: true },
//     nic: { type: String, required: true },
//   });
//   const Customer = mongoose.model("Customer", customerSchema);

//   export default Customregister;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customRegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
    password: { type: String, required: true },
    profileimage: { type: String,required: true }
}, {
    timestamps: true
});

// Encrypt password before saving
customRegisterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const CustomRegister = mongoose.model('CustomRegister', customRegisterSchema);

export default CustomRegister;
