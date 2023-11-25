import { Router } from 'express';
const router = Router();
import { jwtAuth } from '../middlewares/jwtAuth.js';
import {createPost, getAllPosts} from '../controllers/post.controller.js';

router.post('/', jwtAuth, createPost);
router.get('/', getAllPosts);



export default router;