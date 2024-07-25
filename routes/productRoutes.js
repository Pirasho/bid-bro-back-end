import express from 'express';
import { getAllProduct , getProductById} from '../controllers/productControllers.js';





const router=express.Router();


router.get('/get' , getAllProduct );
router.get('/id/:id' , getProductById );


export default router;