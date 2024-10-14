import express from 'express';
import { registerUser, loginUser } from '../controllers/customregisterControllers.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/signin', loginUser);

export default router;
