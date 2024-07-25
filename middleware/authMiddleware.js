import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import Customer from "../models/customerModal.js";

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
    const token = authHeader?.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            req.customer = await Customer.findById(decoded.userId).select("-password");
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export {protect};