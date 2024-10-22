const Respond = require('../models/respond');

exports.postRespond = async (req, res) => {

    const { product } = req.body;
    const { model } = req.body;
    const { version } = req.body;
    const { color } = req.body;
    const { mrp} = req.body;
    const { sellp } = req.body;
    const { period } = req.body;
    const { type } = req.body;
    const { discount } = req.body;
    const { note } = req.body;

    const blog = new Respond({
        product, model,version, color,mrp, sellp, period, type, discount, note
    });
    
    const createdBlog = await blog.save();
    res.status(201).json({
        blog: {
            ...createdBlog._doc,
        },
    });

};




