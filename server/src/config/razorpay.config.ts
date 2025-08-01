import Razorpay from "razorpay"
import dotenv from 'dotenv'
dotenv.config()

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret:  process.env.RAZORPAY_SECRET,
});