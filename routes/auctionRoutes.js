import express from 'express';
import { getAllAuction, getAuctionById, postAllAuction } from '../controllers/auctionControllers.js';

const router=express.Router();



router.get('/get' , getAllAuction );
router.get('/id/:id' , getAuctionById );
router.post('/post' , postAllAuction );


// router.put('/id/:id' , putProductById );
export default router;