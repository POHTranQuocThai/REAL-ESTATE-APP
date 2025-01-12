
import jwt from 'jsonwebtoken'
import { env } from '../config/enviroment.js'
import { verifyToken } from '../middleware/verifyToken.js'

export const testController = {
    shouldBeloggedIn: async (req, res) => {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(403).json({ message: 'Not authenticated!' })
            }
            jwt.verify(token, env.JWT_SECRET_KEY, async (err, payload) => {
                if (err) return res.status(403).json({ message: 'Token is not valid!!' })
            })
            res.status(200).json({ message: 'AUthenticated success!!' })
        } catch (error) {
            return res.status(403).json({ message: error.message })
        }
    },
    shouldBeAdmin: async () => {
        verifyToken()
    }
}