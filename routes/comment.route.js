import { Router } from 'express';
const router = Router();
import {createComment, deleteComment} from '../controllers/comment.controller.js';


router.post('/create', createComment);
router.delete('/:id/delete', deleteComment);





export default router;