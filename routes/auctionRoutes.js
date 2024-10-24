import express from 'express';
import { getAllAuction, getAllAuctionwithid, getAllBidsByAuctionId, getAuctionById, postAllAuction, updateBidAcceptStatus } from '../controllers/auctionControllers.js';

const router = express.Router();

router.post('/post', postAllAuction);
router.get('/get' , getAllAuction );
router.get('/get/:id' , getAllAuctionwithid);
router.get('/id/:id', getAuctionById);
router.get('/auctionget/:id', getAllBidsByAuctionId);
router.put('/update/auction/:auctionId/:sellerId', updateBidAcceptStatus);

export default router;