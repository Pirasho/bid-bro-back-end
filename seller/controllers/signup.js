const SignupModel = require('../models/signup');
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
}).single('document')


exports.postSignup = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
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
            })
            newUser.save()
                .then(() => res.send('successfully uploaded'))
                .catch((err) => console.log(err));
        }
    });
};


exports.findUser = async (req, res) => {

    try {
      
        const blogs = await SignupModel.find();
        const findArray = [];

        blogs.map((item) => {
            if(item.username === req.params.id){
                findArray.push(item.password)
            }
        });

        res.json(findArray)

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};