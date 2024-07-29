import express from "express";
import  productRoutes  from "./productRoutes.js";
import  sellerRoutes  from "./sellerRoutes.js";
import  salesRoutes  from "./salesRoutes.js";
import  customerRoutes  from "./customerRoutes.js";



const router = express.Router();


router.use("/api/product", productRoutes);
router.use("/api/seller", sellerRoutes);
router.use("/api/sales",salesRoutes );
router.use("/api/customers",customerRoutes );






export default router;