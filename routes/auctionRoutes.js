import express from 'express';
import { getAllAuction, getAllAuctionwithid, getAuctionById, postAllAuction } from '../controllers/auctionControllers.js';

const router = express.Router();

router.post('/post', postAllAuction);
router.get('/get' , getAllAuction );
router.get('/get/:id' , getAllAuctionwithid);
router.get('/id/:id', getAuctionById);

export default router;