//index.js
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
import  sellRoutes  from "./sellRoutes.js";


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
router.use("/api/sell", sellRoutes);

export default router;

