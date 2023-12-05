import { Router } from 'express';
const router = Router();
import {createComment} from '../controllers/comment.controller.js';


router.post('/create', createComment);





export default router;