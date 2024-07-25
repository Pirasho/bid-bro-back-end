import express from 'express';
import { getAllProduct } from '../controllers/productControllers.js';





const router=express.Router();


router.get('/get' , getAllProduct );

export default router;