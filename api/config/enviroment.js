import dotenv from 'dotenv'
dotenv.config()

export const env = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}