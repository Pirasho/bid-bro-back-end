import express from 'express';
import { deleteProductById, getAllProduct , getProductById, postAllProducts, putProductById} from '../controllers/productControllers.js';
import { getAllproductCount } from '../controllers/productCountControllers.js';

const router=express.Router();


router.get('/get' , getAllProduct );

router.get('/id/:id' , getProductById );
router.post('/post' , postAllProducts );
router.put('/id/:id' , putProductById );
router.delete('/id/:id' , deleteProductById );
router.get('/productCount/get' , getAllproductCount );


export default router;