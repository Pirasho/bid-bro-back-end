import ReceiptModel from '../models/receipt.js';  // Importing the ReceiptModel
import multer from 'multer';  // Importing multer
import fs from 'fs';  // Importing fs

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

export const postReceipt = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading file');
        } else {
            try {
                const newReceipt = new ReceiptModel({
                    image: {
                        data: fs.readFileSync('uploads/' + req.file.filename),
                        contentType: 'image/png',
                    },
                    product: req.body.product,
                    model: req.body.model,
                    version: req.body.version,
                    color: req.body.color,
                    sellp: req.body.sellp,
                    daddress: req.body.daddress,
                    dfees: req.body.dfees,
                    date: req.body.date,
                });
                await newReceipt.save();
                res.send('Successfully uploaded');
            } catch (error) {
                console.error('Database error:', error);
                res.status(500).send('Error saving to database');
            }
        }
    });
};

export const getReceipt = async (req, res) => {
    try {
        const receipts = await ReceiptModel.find();
        res.json(receipts);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Error retrieving receipts');
    }
};

export default {
    postReceipt,
    getReceipt,
};
