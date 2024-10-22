const ReceiptModel = require('../models/receipt');
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


exports.postReceipt = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newBid = new ReceiptModel({
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
                date: req.body.date
            })
            newBid.save()
                .then(() => res.send('successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
};

exports.getReceipt = async (req, res) => {
    const blogs = await ReceiptModel.find();
    res.json(blogs);
};

