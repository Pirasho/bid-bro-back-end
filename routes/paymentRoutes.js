import express from "express";
import {payHereHash} from "../controllers/paymentControllers";


const router = express.Router();

router.route('/payment-hash'),post(payHereHash);

export default router;