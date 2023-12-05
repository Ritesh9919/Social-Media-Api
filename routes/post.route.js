import { Router } from 'express';
const router = Router();
import {createPost, getAllPosts, getSingalPost, updatePost, deletePost} from '../controllers/post.controller.js';

router.post('/create',createPost);
router.get('/', getAllPosts);
router.get('/:postId', getSingalPost);
router.put('/:postId/update', updatePost);
router.delete('/:postId/delete', deletePost);



export default router;