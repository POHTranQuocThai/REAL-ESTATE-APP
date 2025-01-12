
import exprss from 'express'
import { testController } from '../controllers/testController.js'

const router = exprss.Router()

router.post('/should-belogged-in', testController.shouldBeloggedIn)
router.post('/should-be-admin', testController.shouldBeAdmin)


export default router