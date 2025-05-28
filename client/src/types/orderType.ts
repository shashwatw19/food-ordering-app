export type CheckoutSessionRequest = {
    cartItems : {
        menuId : string,
        name : string,
        description : string,
        price: string,
        quantity : string
    }[],
    deliveryDetails : {
        name : string,
        email : string,
        contact : string,
        address: string
    },
    restaurantId : string
}

export interface Orders extends CheckoutSessionRequest{
    _id : string,
    status : string,
    totalAmount : number
}

export type OrderState = {
    loading : boolean;
    order : Orders[],
    createCheckoutSession : (checkoutSessionRequest : CheckoutSessionRequest)=>Promise<void>
    getOrderDetails : ()=>Promise<void>
}