import express from 'express';
import { deletesellerById, getAllseller, getsellerById, postAllseller, putsellerById  } from '../controllers/sellerControllers.js';

const router=express.Router();


router.get('/get' , getAllseller );
router.get('/id/:id' , getsellerById );
router.post('/post' , postAllseller );
router.put('/id/:id' , putsellerById );
router.delete('/id/:id' , deletesellerById );




export default router;