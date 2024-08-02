import express from 'express';
import { getAllSellerbid, getSellerbidById, postAllSellerbid } from '../controllers/sellerbidControllers.js';


const router=express.Router();


router.get('/get' , getAllSellerbid );
router.get('/id/:id' , getSellerbidById );
router.post('/post' , postAllSellerbid );



export default router;