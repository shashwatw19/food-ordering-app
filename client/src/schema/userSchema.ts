import {z} from 'zod'

export const userSignupSchema = z.object({
    fullname : z.string().min(1 , 'Fullname is required').max(50 , 'Fullname must be less than 50 characters'),
    email : z.string().email('Invalid email address'),
    contact : z.string().min(10 , 'Contact number must be at least 10 digits'),
    password : z.string().min(6 , 'Password must be 6 characters')
})

export const userLoginSchema = z.object({
   
    email : z.string().email('Invalid email address'),
    password : z.string().min(6 , 'Password must be 6 characters')
})

export const userForgotPasswordSchema = z.object({
    email : z.string().email('Invalid email address')
})

export type SignupInputState = z.infer<typeof userSignupSchema>
export type LoginInputState = z.infer<typeof userLoginSchema>
export type ForgotPasswordInputState = z.infer<typeof userForgotPasswordSchema>