import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin:  'http://localhost:5173',
    credentials : true
}));

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/api/v1' , (req ,res )=>{res.send('Heelo mf!!')})

import userRouter from '../src/routes/user.routes'
import restaurantRouter from '../src/routes/restaurant.routes'
import menuRouter from '../src/routes/menu.routes'
import paymentRouter from '../src/routes/payments.routes'
import orderRouter from '../src/routes/order.routes'

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/restaurant' , restaurantRouter)
app.use('/api/v1/menu' , menuRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/order' , orderRouter)


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        statusCode : statusCode
    });
});
export {app}