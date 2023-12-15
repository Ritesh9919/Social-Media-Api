import { Router } from 'express';
const router = Router();
import {upload} from '../middlewares/multer.middleware.js';
import {register, login} from '../controllers/auth.controller.js';



router.post('/register', upload.single('avatar'),register);
router.post('/login', login);




export default router;