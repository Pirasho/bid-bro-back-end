import express from 'express';
import { getAvailable, postAvailable } from '../controllers/available.js';


const router=express.Router();


router.get('/getAvailable' , getAvailable );
router.post('/postAvailable' , postAvailable );



export default router;