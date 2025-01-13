
import { prisma } from "../lib/prisma.js"
export const postController = {
    getPosts: async (req, res) => {
        try {
            const query = req.query
            const posts = await prisma.post.findMany({
                where: {
                    city: query.city || undefined,
                    type: query.type || undefined,
                    property: query.property || undefined,
                    bedroom: parseInt(query.bedroom) || undefined,
                    price: {
                        gte: parseInt(query.minPrice) || 0,
                        lte: parseInt(query.maxPrice) || 10000000
                    }
                }
            })
            res.status(200).json({ message: 'Get posts success', data: posts })
        } catch (error) {
            res.status(404).json({ message: 'Failed' + error.message })
        }
    },
    addPost: async (req, res) => {
        try {
            const tokenUserId = req.userId
            const body = req.body
            console.log('🚀 ~ addPost: ~ body:', body)
            const post = await prisma.post.create({
                data: {
                    ...body.postData,
                    userId: tokenUserId,
                    postDetail: {
                        create: body.postDetail
                    }
                }
            })
            console.log('🚀 ~ addPost: ~ post:', post)
            res.status(200).json({ message: 'Add post success', data: post })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    getPost: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(404).json({ message: 'Miss parameter' })
            }
            const post = await prisma.post.findUnique({
                where: { id: id },
                include: {
                    postDetail: true,
                    user: {
                        select: {
                            username: true,
                            avatar: true
                        }
                    }
                }
            })
            res.status(200).json({ message: 'Get post success', data: post })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    updatePost: async (req, res) => {
        try {
            const postId = req.params.id
            const tokenUserId = req.userId
            const post = await prisma.post.findUnique({
                where: { id: postId }
            })
            if (post.userId !== tokenUserId) {
                return res.status(404).json({ message: 'Not authenticated' })
            }
            const postUpdated = await prisma.post.update({
                where: { id: postId },
                data: {
                    ...req.body
                }
            })
            res.status(200).json({ message: 'Updated post success', data: postUpdated })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.id
            const tokenUserId = req.userId
            const post = await prisma.post.findUnique({
                where: { id: postId }
            })
            if (post.userId !== tokenUserId) {
                return res.status(404).json({ message: 'Not authenticated' })
            }
            await prisma.post.delete({
                where: { id: postId }
            })
            res.status(200).json({ message: 'Deleted post success' })
        } catch (error) {
            res.status(404).json({ message: 'Failed' })
        }
    },
}