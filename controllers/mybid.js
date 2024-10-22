const MybidModel = require('../models/mybid');
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
}).single('bidImage')


exports.postBid = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
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
            })
            newBid.save()
                .then(() => res.send('successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
};

exports.getBid = async (req, res) => {
    const blogs = await MybidModel.find();
    res.json(blogs);
};

