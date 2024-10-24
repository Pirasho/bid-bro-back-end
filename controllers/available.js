import asyncHandler from "express-async-handler";
import AvailableModel from '../models/available.js';
import multer from 'multer';
import fs from 'fs';

// Define multer storage configuration
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Configure multer for single file upload
const upload = multer({
    storage: Storage
}).single('Image');

// Add a new available product
export const postAvailable = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("Error uploading file:", err);
            return res.status(500).json({ error: "File upload failed", details: err });
        }
        try {
            const newAvailable = new AvailableModel({
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/png',
                },
                product: req.body.product,
                mrp: req.body.mrp,
                model: req.body.model,
                version: req.body.version,
                color: req.body.color
            });

            await newAvailable.save();
            res.status(201).json({ message: 'Successfully uploaded', available: newAvailable });
        } catch (error) {
            console.error("Error saving available product:", error);
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
    });
});

// Get all available products
export const getAvailable = asyncHandler(async (req, res) => {
    try {
        const availableProducts = await AvailableModel.find();
        res.status(200).json(availableProducts);
    } catch (error) {
        console.error("Error fetching available products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
