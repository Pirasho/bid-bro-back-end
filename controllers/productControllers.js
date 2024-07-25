import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  });

  export {
    getAllProduct 

  }