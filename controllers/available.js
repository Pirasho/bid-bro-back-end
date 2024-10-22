const AvailableModel = require('../models/available');
const multer = require('multer');
const fs = require("fs");


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
}).single('Image')


exports.postAvailable = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newBid = new AvailableModel({
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/png',
                },
                product: req.body.product,
                mrp: req.body.mrp,
                model: req.body.model,
                version: req.body.version,
                color: req.body.color
            })
            newBid.save()
                .then(() => res.send('successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
};

exports.getAvailable = async (req, res) => {
    const blogs = await AvailableModel.find();
    res.json(blogs);
};

