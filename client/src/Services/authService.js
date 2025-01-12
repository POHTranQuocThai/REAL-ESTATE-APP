
import { apiRequest } from './apiRequest'

export const authService = {
    fetchRegister: async (data) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.post(`/auth/register`, data)
        return response.data
    },
    fetchLogin: async (data) => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.post(`/auth/login`, data)
        return response.data
    },
    fetchLogout: async () => {
        // eslint-disable-next-line no-undef
        const response = await apiRequest.post(`/auth/logout`)
        return response.data
    }

}