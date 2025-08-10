import { Otp } from "../models/otp.model";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
const generateOtp = () : number =>{
   return Math.floor(100000 + Math.random() * 900000);
}
const createOtp = asyncHandler(async (req: Request, res: Response) => {
	const {email  }  = req.body
    console.log("email for otp " , email)
    if(!email)
        return new ApiError(404 , 'email not found' , [] , "")
    const otp = generateOtp();
    
    const newOtp = await Otp.create({email , otp});

    if(!newOtp)
        return new ApiError(404 , 'not able to create otp' , [] , "")
    
    return res.status(201).json(
        new ApiResponse(200 , 'Otp generated successfully' , {otp : otp})
    )
});      

export {createOtp}