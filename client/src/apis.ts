const BASE_URL : string = import.meta.env.VITE_BASE_URL! || 'http://localhost:8000/api/v2'
console.log(BASE_URL)
export const User =  {
    SIGNUP : BASE_URL + '/user/signup',
    SIGNIN : BASE_URL + '/user/signin',
    FORGOT_PASSWORD : BASE_URL + '/user/forgot-password',
    RESET_PASSWORD : BASE_URL + '/user/reset-password/:token',
    UPDATE_PROFILE : BASE_URL + '/user/updateProfile',
    CREATE_OTP : BASE_URL + '/user/createOtp'
}