import { instance } from "../config/razorpay.config";
import { Restaurant } from "../models/restaurant.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request , Response } from "express";

import crypto, { KeyObject } from "crypto"
import {  Order } from "../models/order.model";
import { mailSender } from "../utils/mailSendet";
import { orderSuccessTemplate } from "../mail/template/orderSuccessTemplate";
export type CheckoutSessionRequest = {
  cartItems: {
    name: string;
    description: string;
    price: Number;
    imageUrl: string;
    _id: string;
    quantity: number;
  }[],
  DeliveryDetails : {
    fullname : string ,
    email  :string,
    address : string,
    city : string,
    contact : string
  },
 
  restaurantId : string
};

const capturePayment = asyncHandler(async(req : Request , res : Response)=>{
    const checkoutSessionRequest : CheckoutSessionRequest = req.body
    console.log(checkoutSessionRequest)
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menu')

    if(!restaurant){
        throw new ApiError(404 , 'restaurant not found')
    }
 
   let totalAmount = checkoutSessionRequest.cartItems.reduce((acc , item)=>{
        return acc += item.price as number * item.quantity
    },0)
    const options = {
        amount : totalAmount * 100,
        currency: "INR",
        receipt: Math.random().toString(36).substring(2, 12),
    }
    // console.log(options)
    try{
        const paymentResponse = await instance.orders.create(options)
        console.log("paymentResponse from createOrders" , paymentResponse)
        return res.status(200).json(
            new ApiResponse(200  , 'order creadted ' , paymentResponse)
        )
    }catch(e){
        console.log(e)
        throw new ApiError(401 ,  `error from razorPay while creating order ${e}`)
    }

})
const verifyPayment = asyncHandler(async(req : Request , res :Response)=>{
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const orderDetails = req.body?.orderDetails
  const cartDetails = req.body.orderDetails.cartItems
  const totalAmount = req.body.totalAmount
  const userId = req.user?._id
  console.log("Reqest body for rzp payment req " , req.body)
  console.log(cartDetails)
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !orderDetails ||
    !userId 
   
  ) {
    throw new ApiError(401 , 'Data for Payment verifiation not found.... Payment Failed!')
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature =  crypto.createHmac("sha256", process.env.RAZORPAY_SECRET as BinaryType | KeyObject).update(body.toString()).digest("hex")
  console.log("expectedSignature from rzp " , expectedSignature)
  if (expectedSignature === razorpay_signature) {
    let newOrder
    try{
         newOrder = await createOrder(orderDetails  , userId , totalAmount)
    }catch(e){
        console.log("error while creating order " , e)
        throw new ApiError(401 , 'Error while creating order...' )
    }
   
    return res.status(200).json(
      new ApiResponse(200 , 'Payment Verified...' , newOrder)
    )
  }

  throw new ApiError(401 , 'Payment Failed...' )

})

const createOrder = async(orderDetails : CheckoutSessionRequest , userId : unknown , totalAmount : string)=>{
    try{
       const newOrder = await Order.create({
          cartItems : orderDetails.cartItems ,
          user : userId,
          restaurant : orderDetails.restaurantId,
          DeliveryDetails : orderDetails.DeliveryDetails,
          totalAmount : Number(totalAmount),
          status : "pending",

        })
        return newOrder
    }catch(e : any){  
      throw e
    }
}

const sendOrderSuccessMail = asyncHandler(async(req : Request , res : Response)=>{

  const orderDetails  = req.body
  console.log("orderDetails for sending success mail " , orderDetails)
  try{
        const response = await mailSender(orderDetails?.DeliveryDetails?.email , 'Your Has Been Order Confirmed | FlavorTrails' , orderSuccessTemplate(orderDetails?.DeliveryDetails , orderDetails.cartItems) )
        console.log("response from sentSuccessMail" , response)
        return res.status(200).json(
          new ApiResponse(200 , 'success mail sent!')
        )
  }catch(e){  
      console.log("error while sending order success mail" , e)
      throw new ApiError(500 , 'error while sending success mail')
  }
})

export {capturePayment , verifyPayment , sendOrderSuccessMail}
