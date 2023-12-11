import { Router } from 'express';
const router = Router();
import {createComment, deleteComment, getComment, updateComment} from '../controllers/comment.controller.js';


router.post('/create', createComment);
router.delete('/:id/delete', deleteComment);
router.get('/:postId', getComment);
router.put('/:commentId/update', updateComment);





export default router;