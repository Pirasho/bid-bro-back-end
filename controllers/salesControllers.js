import asyncHandler from "express-async-handler";
import Sales from "../models/salesModels.js";

const getAllsales = asyncHandler(async (req, res) => {
  try {
    const sales = await Sales.find();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

const postsalesById = asyncHandler(async (req, res) => {
  try {
    const { productName, count } = req.body;
    if (!productName || !count) {
      return res.status(400).json({ error: 'Product name and count are required' });
    }
    const newSale = new Sales({ productName, count });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

export {
  getAllsales ,
  postsalesById ,
}