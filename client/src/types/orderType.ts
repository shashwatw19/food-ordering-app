import { NavigateFunction } from "react-router-dom"
import { CartItem } from "./cartType"
import { Restaurant } from "./restaurantType"
export type CheckoutSessionRequest = {
    cartItems : CartItem[],
    DeliveryDetails : {
        fullname : string,
        email : string,
        city : string,
        contact : string,
        address: string
    },
   
    restaurantId : string
}

export type VerifyPayment = {
    orderDetails : {
        cartItems : CartItem[],
        DeliveryDetails : {
        fullname : string,
        email : string,
        city : string,
        contact : string,
        address: string
        },
        restaurantId : string
    },
    razorpay_order_id  : string,
    razorpay_payment_id  : string,
    razorpay_signature  : string,
    totalAmount  : string,
   
}

export interface Orders extends CheckoutSessionRequest{
    _id : string,
    status : string,
   totalAmount?:string,
   restaurant?:Restaurant
}

export type OrderState = {
    loading : boolean;
    order : Orders[] ,
    loadScript : (src : string)=>Promise<boolean>
    capturePayment : (checkoutSessionRequest : CheckoutSessionRequest)=>Promise<any>
    verifyPayment : (input : VerifyPayment , navigate : NavigateFunction)=>Promise<any>
    sendSuccessMail : (input : CheckoutSessionRequest)=>Promise<boolean>
    findOrderForRestaurant : ()=>Promise<boolean>,
    updateStatus : ({order_id , status } : {order_id : string, status : string} )=>Promise<boolean> ,
    getAllOrdersForRestaurant : ()=>Promise<boolean>,
    setOrderData : ()=>void,
    getPendingOrders : ()=>Promise<boolean>,
    getOrdersForUser : ()=>Promise<boolean>
}

