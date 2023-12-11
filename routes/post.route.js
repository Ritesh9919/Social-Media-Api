import { Router } from 'express';
const router = Router();
import {upload} from '../middlewares/multer.middleware.js';
import {createPost, getAllPosts, getSingalPost, updatePost, deletePost, getPostsByUser} from '../controllers/post.controller.js';

router.post('/create', upload.fields([
    {
      name:'captionImage',
      maxCount:1
    }
]),createPost);
router.get('/all', getAllPosts);
router.get('/', getPostsByUser);
router.get('/:postId', getSingalPost);
router.put('/:postId/update', updatePost);
router.delete('/:postId/delete', deletePost);



export default router;