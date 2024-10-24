import AvailableModel from '../models/available.js';  // Importing the AvailableModel
import fs from 'fs';  // Importing fs
import multer from 'multer';  // Importing multer

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads';
        // Ensure the uploads directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Create multer upload instance
const upload = multer({ storage: storage }).single('Image');

// Function to handle posting an available item
export const postAvailable = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).send('Error uploading file');
        }

        try {
            const newBid = new AvailableModel({
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: req.file.mimetype,
                },
                product: req.body.product,
                mrp: req.body.mrp,
                model: req.body.model,
                version: req.body.version,
                color: req.body.color,
            });

            await newBid.save();
            res.status(201).send('Successfully uploaded');
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).send('Error saving to database');
        }
    });
};

// Function to handle getting available items
export const getAvailable = async (req, res) => {
    try {
        const items = await AvailableModel.find();
        res.json(items);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Error retrieving items');
    }
};

export default {
    postAvailable,
    getAvailable,
};
