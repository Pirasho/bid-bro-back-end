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
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: error.message});
  }
  });



  export {
    getAllProduct ,
    getProductById

  }