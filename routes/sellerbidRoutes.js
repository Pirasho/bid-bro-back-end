import express from 'express';
import { getAllSellerbid, getOrderhistroyOneWithCustomerId, getOrderhistroyWithCustomerId, getSellerbidByauctionId, getSellerbidById, getSellerbidBysellerbidId, postAllSellerbid, updateSellerBidWithCustomerId } from '../controllers/sellerbidControllers.js';


const router=express.Router();


router.get('/get' , getAllSellerbid );
router.get('/id/:id' , getSellerbidById );
router.get('/id/:auction_id/:seller_id' , getSellerbidById );
router.post('/post' , postAllSellerbid );
router.get('/auction/:id' , getSellerbidByauctionId );
router.get('/auction/seller/:id' , getSellerbidBysellerbidId);
router.put('/auction/seller/status/:id' , updateSellerBidWithCustomerId);
router.get('/orderhistory/:id' , getOrderhistroyWithCustomerId);
router.get('/orderhistoryone/:id' , getOrderhistroyOneWithCustomerId);

export default router;