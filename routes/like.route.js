import { Router } from 'express';
const router = Router();
import { toogleLike } from '../controllers/like.controller.js';

router.post('/toggle', toogleLike);


export default router;