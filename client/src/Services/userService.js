
import { apiRequest } from './apiRequest'

export const userService = {
    getPosts: async () => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.get(`/posts/`)
        return response.data
    },
    addPost: async (data) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.get(`/posts/`)
        return response.data
    },
    getPostById: async (id) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.get(`/posts/${id}`)
        return response.data
    },
    updatePost: async (id, data) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.put(`/posts/${id}`, data)
        return response.data
    },
    deletePost: async (id) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.delete(`/posts/${id}`)
        return response.data
    },

}