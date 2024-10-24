import MybidModel from '../models/mybid.js';  // Change to import
import multer from 'multer';
import fs from 'fs';

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
}).single('bidImage');

export const postBid = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading file');
        } else {
            const newBid = new MybidModel({
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/png',
                },
                product: req.body.product,
                mrp: req.body.mrp,
                model: req.body.model,
                version: req.body.version,
                color: req.body.color,
                date: req.body.date
            });

            newBid.save()
                .then(() => res.send('Successfully uploaded'))
                .catch((err) => {
                    console.log(err);
                    res.status(500).send('Error saving to database');
                });
        }
    });
};

export const getBid = async (req, res) => {
    try {
        const bids = await MybidModel.find();
        res.json(bids);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Error retrieving bids');
    }
};

export default {
    postBid,
    getBid,
};
