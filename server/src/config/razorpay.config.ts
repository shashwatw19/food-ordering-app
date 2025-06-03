import Razorpay from "razorpay"
import dotenv from 'dotenv'
dotenv.config()

export const instance = new Razorpay({
  key_id: "rzp_test_Iq7UvGfG2iNRRw",
  key_secret:  "LSQY2kOiPihjHudpSb18sWLc",
});