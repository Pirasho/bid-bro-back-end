import express from 'express';
// const storage = require('../helpers/storage');
const router = express.Router();

// const mybidController = require('../controllers/mybid');
// const respondController = require('../controllers/respond');
// const signupController = require('../controllers/signup');
// const ReceiptController = require('../controllers/receipt');

import OrderController from '../controllers/order.js'
// const AvailableController = require('../controllers/available');


// router.post('/addBid', mybidController.postBid);
// router.get('/getBid', mybidController.getBid);

// router.post('/postrespond', storage, respondController.postRespond);

// router.post('/signup', signupController.postSignup);
// router.get('/findUser/:id', signupController.findUser);

// router.post('/addReceipt', ReceiptController.postReceipt);
// router.get('/getReceipt', ReceiptController.getReceipt);

router.post('/addOrder', OrderController.postOrder);
router.get('/getOrder', OrderController.getOrder);

// router.post('/addAvailable', AvailableController.postAvailable);
// router.get('/getAvailable', AvailableController.getAvailable);


module.exports = router;