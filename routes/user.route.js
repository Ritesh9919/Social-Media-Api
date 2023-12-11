
import { Router } from 'express';
const router = Router();
import {getAllUsers, getUser, updateUser, friendship} from '../controllers/user.controller.js';
import {jwtAuth} from '../middlewares/jwtAuth.js';



router.get('/', getAllUsers);
router.get('/profile/:userId', getUser);
router.put('/update-profile/:userId', updateUser);
router.post('/toggle-friendship/:userId', jwtAuth, friendship);

export default router;




