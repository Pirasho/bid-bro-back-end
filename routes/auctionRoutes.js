import express from 'express';
import { getAllAuction, getAuctionById, postAllAuction } from '../controllers/auctionControllers.js';

const router = express.Router();

router.post('/post', postAllAuction);


router.get('/get' , getAllAuction );
router.get('/id/:id', getAuctionById);

export default router;