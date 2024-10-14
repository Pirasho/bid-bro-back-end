import express from 'express';
import {getAllsales, postsalesById } from '../controllers/salesControllers.js'

const router=express.Router();


router.get('/get' , getAllsales );
router.post('/id/:id' , postsalesById );



export default router;