import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/api/v1', (req: Request, res: Response) => {
  res.send('Food Ordering API is running!')
})

import userRouter from './routes/user.routes.js'
import restaurantRouter from './routes/restaurant.routes.js'
import menuRouter from './routes/menu.routes.js'
import paymentRouter from './routes/payments.routes.js'
import orderRouter from './routes/order.routes.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/restaurant', restaurantRouter)
app.use('/api/v1/menu', menuRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/order', orderRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    statusCode: statusCode,
  })
})
export { app }
