import express from 'express';
import { deletesellerById, getAllseller, getsellerById, loginSeller, postAllseller, putsellerById  } from '../controllers/sellerControllers.js';
import { getAllsellersCount } from '../controllers/sellerCountControllers.js';

const router=express.Router();

router.post('/register' , postAllseller );
router.post('/login' , loginSeller );
router.get('/get' , getAllseller );
router.get('/id/:id' , getsellerById );
router.put('/id/:id' , putsellerById );
router.delete('/id/:id' , deletesellerById );
router.get('/sellersCount/get' , getAllsellersCount  );



export default router;