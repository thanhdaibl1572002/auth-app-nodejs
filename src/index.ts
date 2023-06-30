import 'tsconfig-paths/register'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet' 
import morgan from 'morgan'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'

import UserRouter from '@/routes/user'

config()
const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors({ origin: 'http://example.com' }))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('dev'))
app.use(cookieParser())

// Routes
app.use('/api/users', UserRouter)

// Database connection
connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => app.listen(
    PORT, 
    () => console.log(`Application listening at http://localhost:${PORT}`)))
.catch((error: Error) => {
    console.log(error)
    process.exit(1)
})
