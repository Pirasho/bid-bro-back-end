import express from 'express';
import { getOrder, postOrder } from '../controllers/order.js';

const router=express.Router();


router.get('/getOrder' , getOrder );
router.post('/addOrder' , postOrder );



export default router;