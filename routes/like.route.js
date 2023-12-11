import { Router } from 'express';
const router = Router();
import { toogleLike, getLikeOnPost, getLikeOnComment } from '../controllers/like.controller.js';

router.post('/toggle', toogleLike);
router.get('/:postId/post', getLikeOnPost);
router.get('/:commentId/comment', getLikeOnComment);

export default router;