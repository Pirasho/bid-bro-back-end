import express from "express";
import storage from '../seller/helpers/storage.js';  // Change to ES module import
import mybidController from '../seller/controllers/mybid.js';
import respondController from '../seller/controllers/respond.js';
import signupController from '../seller/controllers/signup.js';
import ReceiptController from '../seller/controllers/receipt.js';
import OrderController from '../seller/controllers/order.js';
import AvailableController from '../seller/controllers/available.js';

const router = express.Router();

// Bid routes
router.post('/addBid', mybidController.postBid);
router.get('/getBid', mybidController.getBid);

// Respond routes
router.post('/postrespond', storage, respondController.postRespond);

// Signup routes
router.post('/signup', signupController.postSignup);
router.get('/findUser/:id', signupController.findUser);

// Receipt routes
router.post('/addReceipt', ReceiptController.postReceipt);
router.get('/getReceipt', ReceiptController.getReceipt);

// Order routes
router.post('/addOrder', OrderController.postOrder);
router.get('/getOrder', OrderController.getOrder);

// Available routes
router.post('/addAvailable', AvailableController.postAvailable);
router.get('/getAvailable', AvailableController.getAvailable);

export default router;
