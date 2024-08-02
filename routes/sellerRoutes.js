import express from 'express';
import { deletesellerById, getAllseller, getsellerById, postAllseller, putsellerById  } from '../controllers/sellerControllers.js';
import { getAllsellersCount } from '../controllers/sellerCountControllers.js';

const router=express.Router();


router.get('/get' , getAllseller );

router.get('/id/:id' , getsellerById );
router.post('/post' , postAllseller );
router.put('/id/:id' , putsellerById );
router.delete('/id/:id' , deletesellerById );
router.get('/sellersCount/get' , getAllsellersCount  );



export default router;