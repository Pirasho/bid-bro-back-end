import Respond from '../models/respond.js';

export const postRespond = async (req, res) => {
    const { product, model, version, color, mrp, sellp, period, type, discount, note } = req.body;

    const blog = new Respond({
        product,
        model,
        version,
        color,
        mrp,
        sellp,
        period,
        type,
        discount,
        note,
    });

    try {
        const createdBlog = await blog.save();
        res.status(201).json({
            blog: {
                ...createdBlog._doc,
            },
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error saving to database' });
    }
};

export default {
    postRespond,
};
