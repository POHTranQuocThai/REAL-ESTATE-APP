
import express from 'express'
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/enviroment.js';
import testRouter from './routes/test.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js'


const app = express()
app.use(cors({ origin: env.LOCAL_HOST_CLIENT, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)
app.use('/api/test', testRouter)

app.listen(8800, () => {
    console.log('test');
})