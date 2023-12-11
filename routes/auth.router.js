import { Router } from 'express';
const router = Router();
import {upload} from '../middlewares/multer.middleware.js';
import {register, login} from '../controllers/auth.controller.js';


router.post('/register', upload.fields([
    {
        name:'avatar',
        maxCount:1
    }
]),register);
router.post('/login', login);




export default router;