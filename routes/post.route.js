import { Router } from 'express';
const router = Router();
import {createPost, getAllPosts, getSingalPost, updatePost, deletePost, getPostsByUser} from '../controllers/post.controller.js';

router.post('/create',createPost);
router.get('/all', getAllPosts);
router.get('/', getPostsByUser);
router.get('/:postId', getSingalPost);
router.put('/:postId/update', updatePost);
router.delete('/:postId/delete', deletePost);



export default router;