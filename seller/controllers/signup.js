import SignupModel from '../models/signup.js';  // Importing the SignupModel
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
}).single('document');

export const postSignup = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading file');
        } else {
            try {
                const newUser = new SignupModel({
                    name: req.body.name,
                    address: req.body.address,
                    shopname: req.body.shopname,
                    shopaddress: req.body.shopaddress,
                    username: req.body.username,
                    password: req.body.password,
                    document: {
                        data: fs.readFileSync('uploads/' + req.file.filename),
                        contentType: 'file/pdf',
                    },
                });
                await newUser.save();
                res.send('Successfully uploaded');
            } catch (error) {
                console.error('Database error:', error);
                res.status(500).send('Error saving to database');
            }
        }
    });
};

export const findUser = async (req, res) => {
    try {
        const blogs = await SignupModel.find();
        const findArray = blogs
            .filter((item) => item.username === req.params.id)
            .map((item) => item.password);
        
        res.json(findArray);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export default {
    findUser,
    postSignup,
};
