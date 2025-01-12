
import exprss from 'express'
import { userController } from '../controllers/userController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = exprss.Router()

router.get('/', verifyToken, userController.getUsers)
router.get('/:id', verifyToken, userController.getUser)
router.put('/:id', verifyToken, userController.updateUser)
router.delete('/:id', verifyToken, userController.deleteUser)

export default router