const BASE_URL : string = import.meta.env.VITE_BASE_URL! || 'http://localhost:8000/api/v2'

export const User =  {
    SIGNUP : BASE_URL + '/user/signup',
    SIGNIN : BASE_URL + '/user/signin',
    FORGOT_PASSWORD : BASE_URL + '/user/forgot-password',
    RESET_PASSWORD : BASE_URL + '/user/reset-password/:token',
    UPDATE_PROFILE : BASE_URL + '/user/updateProfile',
    CREATE_OTP : BASE_URL + '/user/createOtp'
}

export const Restaurants = {
    CREATE : BASE_URL + '/restaurant/create',
    SEARCH : BASE_URL + '/restaurant/search',
    UPDATE : BASE_URL + '/restaurant/update',
    GET_ORDERS : BASE_URL + 'restaurant/orders/:_id',
    UPDATE_ORDER_STATUS : BASE_URL + 'restaurant/order/update',
    ADD_MENU : BASE_URL + '/menu/addMenu',
    UPDATE_MENU : BASE_URL + '/menu/updateMenu',
    GET_RESTAURANT : BASE_URL +'/restaurant/',
    GET_MENU : BASE_URL + '/restaurant/menu'
}
