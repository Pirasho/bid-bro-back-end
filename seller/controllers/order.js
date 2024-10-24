import OrderModel from '../models/order.js';  // Importing the OrderModel
import fs from 'fs';  // Importing fs
import multer from 'multer';  // Importing multer

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

export const postOrder = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading file');
        } else {
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
                res.send('Successfully uploaded');
            } catch (error) {
                console.error('Database error:', error);
                res.status(500).send('Error saving to database');
            }
        }
    });
};

export const getOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Error retrieving orders');
    }
};

export default {
    postOrder,
    getOrder,
};
