import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/userControllers.js';

const router = express.Router();

// Route to get user details by ID
router.get('/user/:id', getUserDetails);

// Route to update user details by ID
router.put('/user/:id', updateUserDetails);

export default router;
