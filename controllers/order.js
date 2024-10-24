const OrderModel = require('../models/order');
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


exports.postOrder = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newBid = new OrderModel({
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
            })
            newBid.save()
                .then(() => res.send('successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
};

exports.getOrder = async (req, res) => {
    const blogs = await OrderModel.find();
    res.json(blogs);
};

