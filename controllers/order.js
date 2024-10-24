import asyncHandler from "express-async-handler";
import OrderModel from "../models/order.js";
import multer from 'multer';
import fs from 'fs';

// Multer storage setup
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage
}).single('Image');

// Add a new order
const postOrder = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Error uploading file:", err);
            return res.status(500).json({ error: "File upload failed", details: err });
        }
        try {
            const newOrder = new OrderModel({
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/png',
                },
                product: req.body.product,
                model: req.body.model,
                version: req.body.version,
                color: req.body.color,
                cname: req.body.cname,
                contact: req.body.contact,
                mrp: req.body.mrp,
                sellp: req.body.sellp,
                date: req.body.date,
            });

            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Error saving order:", error);
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
    });
});

// Get all orders
const getOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export {
    postOrder,
    getOrder
};
