import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin:   `${process.env.ORIGIN}`,
    credentials : true
}));

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/' , (req ,res )=>{res.send('Heelo mf!!')})

console.log(process.env.ACCESS_TOKEN_EXPIRY)
export {app}