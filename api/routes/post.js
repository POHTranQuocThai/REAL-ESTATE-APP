
import exprss from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { postController } from '../controllers/postController.js'


const router = exprss.Router()

router.get('/', verifyToken, postController.getPosts)
router.get('/:id', verifyToken, postController.getPost)
router.post('/', verifyToken, postController.addPost)
router.put('/:id', verifyToken, postController.updatePost)
router.delete('/:id', verifyToken, postController.deletePost)

export default router