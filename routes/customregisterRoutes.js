// import express from 'express';
// import { getcustomersById, getAllcustomers, postAllcustomers, putcustomersById, deletecustomersById } from '../controllers/customerControllers.js';

// const router=express.Router();


// router.get('/get' , getAllcustomers );
// router.get('/id/:id' , getcustomersById );
// router.post('/post' , postAllcustomregister );



// export default router;

import express from 'express';
import { registerUser, loginUser } from '../controllers/customregisterControllers';

const router = express.Router();

router.post('/post', registerUser);
router.post('/login', loginUser);

export default router;
