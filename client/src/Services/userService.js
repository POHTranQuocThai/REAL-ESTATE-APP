
import { apiRequest } from './apiRequest'

export const userService = {
    getUsers: async () => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.get(`/user/`)
        return response.data
    },
    getUserById: async (id) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.get(`/user/${id}`)
        return response.data
    },
    updateUser: async (id, data) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.put(`/user/${id}`, data)
        return response.data
    },
    deleteUser: async (id) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.delete(`/user/${id}`)
        return response.data
    },

}