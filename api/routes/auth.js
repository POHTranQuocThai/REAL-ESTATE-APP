
import exprss from 'express'
import { authController } from '../controllers/authController.js'

const router = exprss.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router