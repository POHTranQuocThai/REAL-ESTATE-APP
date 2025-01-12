import dotenv from 'dotenv'
dotenv.config()

export const env = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    LOCAL_HOST_CLIENT: process.env.LOCAL_HOST_CLIENT
}