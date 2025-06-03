const BASE_URL : string = import.meta.env.VITE_BASE_URL! || 'http://localhost:8000/api/v2'

export const User =  {
    SIGNUP : BASE_URL + '/user/signup',
    SIGNIN : BASE_URL + '/user/signin',
    FORGOT_PASSWORD : BASE_URL + '/user/forgot-password',
    RESET_PASSWORD : BASE_URL + '/user/reset-password/:token',
    UPDATE_PROFILE : BASE_URL + '/user/updateProfile',
    CREATE_OTP : BASE_URL + '/user/createOtp',
    CHECK_AUTH : BASE_URL + '/user/verify',
    LOG_OUT : BASE_URL + '/user/logout',

   
}

export const Restaurants = {
    CREATE : BASE_URL + '/restaurant/create',
    SEARCH : BASE_URL + '/restaurant/search',
    UPDATE : BASE_URL + '/restaurant/update',
    GET_ORDERS : BASE_URL + 'restaurant/orders/:_id',
    UPDATE_ORDER_STATUS : BASE_URL + 'restaurant/order/update',
    ADD_MENU : BASE_URL + '/menu/addMenu',
    UPDATE_MENU : BASE_URL + '/menu/updateMenu',
    GET_RESTAURANT : BASE_URL +'/restaurant',
    GET_MENU : BASE_URL + '/restaurant/menu'
}


export const PAYMENTS = {
    CAPTURE_PAYMENT : BASE_URL + '/payment/capturePayment',
    VERIFY_PAYMENT : BASE_URL + '/payment/verify',
    SEND_ORDER_SUCCESS_MAIL : BASE_URL + '/payment/successOrderMail'
}

export const ORDERS = {
    STATUS : BASE_URL + '/order/status',
    DELIVERED_ORDERS : BASE_URL + '/order/delivered',
    FIND_ORDERS : BASE_URL + '/order/findOrders',
    GET_ORDER : BASE_URL + '/order/getOrder',
    PENDING_ORDER : BASE_URL + '/order/pending'
}