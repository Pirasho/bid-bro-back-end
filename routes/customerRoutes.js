import express from 'express';
import { getcustomersById, getAllcustomers, postAllcustomers, putcustomersById, deletecustomersById } from '../controllers/customerControllers.js';

const router=express.Router();


router.get('/get' , getAllcustomers );
router.get('/id/:id' , getcustomersById );
router.post('/post' , postAllcustomers );
router.put('/id/:id' , putcustomersById );
router.delete('/id/:id' , deletecustomersById );


export default router;