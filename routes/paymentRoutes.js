import express from 'express';
import { payHereHash } from '../controllers/paymentControllers.js';

const router=express.Router();


router.post('/payment-hah' , payHereHash );


export default router;