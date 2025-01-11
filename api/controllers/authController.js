import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import { env } from '../config/enviroment.js'

export const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body
            console.log('🚀 ~ register: ~ username, email, password:', username, email, password)
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
            })
            if (!newUser) {
                return res.status(401).json({ message: 'User created unsuccessfully!' })

            }
            res.status(201).json({ message: 'User created successfully!' })
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            console.log('🚀 ~ login: ~ username, password:', username, password)
            const user = await prisma.user.findUnique({
                where: { username }
            })
            console.log('🚀 ~ login: ~ user:', user)
            if (!user) {
                return res.status(401).json({ message: 'User not found!' })
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            console.log('🚀 ~ login: ~ isPasswordValid:', isPasswordValid)
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Username or password incorrect!' })
            }
            const age = 1000 * 60 * 60 * 24 * 7

            console.log('JWT Secret Key:', env.JWT_SECRET_KEY);
            const token = jwt.sign(
                { id: user?.id },
                env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: age
            }).status(200).json({ message: 'Login success!' })
        } catch (error) {
            return res.status(401).json({ message: 'Failed to login' })
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token').status(200).json({ message: 'Logout success!' })
    }
}