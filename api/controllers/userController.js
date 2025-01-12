import { prisma } from "../lib/prisma.js"
import bcrypt from 'bcrypt'
export const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await prisma.user.findMany()
            res.status(200).json({ message: 'Get users success', data: users })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(404).json({ message: 'Miss parameter' })
            }
            const users = await prisma.user.findUnique({
                where: { id: id }
            })
            res.status(200).json({ message: 'Get user success', data: users })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    updateUser: async (req, res) => {
        console.log('🚀 ~ updateUser: ~ req:', req.userId)
        try {
            const id = req.params.id
            const tokenUserId = req.userId
            const { password, avatar, ...inputs } = req.body
            if (id !== tokenUserId) {
                return res.status(404).json({ message: 'Not authenticated' })
            }
            let updatedPassword = null

            if (password) {
                updatedPassword = await bcrypt.hash(password)
            }
            const users = await prisma.user.update({
                where: { id },
                data: {
                    ...inputs,
                    ...(updatedPassword && { password: updatedPassword }),
                    ...(avatar && { avatar })
                }
            })
            const { password: passUpdated, ...updated } = users
            res.status(200).json({ message: 'Updated user success', data: updated })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            const tokenUserId = req.userId
            if (id !== tokenUserId) {
                return res.status(404).json({ message: 'Not authenticated' })
            }
            await prisma.user.delete({
                where: { id }
            })
            res.status(200).json({ message: 'Deleted user success' })

        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
}