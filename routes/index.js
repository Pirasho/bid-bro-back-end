import express from "express";
import  productRoutes  from "./productRoutes.js";
import  sellerRoutes  from "./sellerRoutes.js";
import  salesRoutes  from "./salesRoutes.js";
import  customerRoutes  from "./customerRoutes.js";
import  auctionRoutes  from "./auctionRoutes.js";
import  sellerbidRoutes  from "./sellerbidRoutes.js";
import  ratingformRoutes  from "./ratingformRoutes.js";
import  customregisterRoutes  from "./customregisterRoutes.js";
import  userRoutes  from "./userRoutes.js";
import paymentRoutes from "./paymentRoutes.js"
import orderRoutes from "./orderRoutes.js"
import availableRoutes from "./availableRoutes.js"


const router = express.Router();


router.use("/api/product", productRoutes);
router.use("/api/seller", sellerRoutes);
router.use("/api/sales",salesRoutes );
router.use("/api/customers",customerRoutes );
router.use("/api/auction",auctionRoutes );
router.use("/api/sellerbid",sellerbidRoutes );
router.use("/api/review", ratingformRoutes);
router.use("/api", customregisterRoutes);
router.use("/api", userRoutes);
router.use("/api/pay", paymentRoutes);
router.use("/api/order", orderRoutes);
router.use("/api/available", availableRoutes);

export default router;

