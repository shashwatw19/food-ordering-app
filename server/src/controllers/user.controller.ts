import { Otp } from "../models/otp.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request } from "express";
import { Response } from "express";

export type tokenType = {
    verificationToken : string,
    refreshToken : string
}
const generateAccessAndRefreshToken = async(userId : unknown) : Promise<tokenType> =>{
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const verificationToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    
    user.verificationToken = verificationToken
    user.refreshToken = refreshToken
    
    await user.save({validateBeforeSave : false})

    return {verificationToken , refreshToken}
} 
//signup
const signup = asyncHandler(async(req : Request , res : Response)=>{
    const {fullname , email , password , contact , otp} = req.body;
    if([fullname , email , password , contact , otp].some(field => field?.trim() === ""))
        throw new ApiError(400 , 'All fields are required' );

   
    const existedUser = await User.findOne({email});
    if(existedUser)
        throw new ApiError(400 , 'User already registered ');

    let currentOtp = otp;
    const generatedOtp = await Otp.find({email}).sort({createdAt : -1}).limit(1)

    if(!generatedOtp)
        throw new ApiError(404 , `Otp not found with ${email}` );
    if(generatedOtp[0]?.otp != currentOtp)
        throw new ApiError(401 , 'Invalid Otp')

    const user = await User.create({fullname , email , password , contact  });

    if(!user)
        throw new ApiError(401 , 'Not able to create User' );
    
    const createdUser = await User.findById(user._id).select('-password -refreshToken')
    
    return res.status(201).json(
        new ApiResponse(200 , 'User created successfully ' , {createdUser})
    )
})
//login
const login = asyncHandler(async(req : Request, res : Response)=>{
    const {email , password} = req.body;

    if([email , password].some(field=>field?.trim()===""))
        throw new ApiError(404 , 'all fields are required');

    const validUser = await User.findOne({
        $or : [{email} , {password}]
    })
    if(!validUser)
        throw new ApiError(401 , 'invalid User');

    const isPasswordMatched = await validUser.matchPassword(password)
    
    if(!isPasswordMatched)
        throw new ApiError(401 , 'inValid Password')

    const {verificationToken ,refreshToken} = await generateAccessAndRefreshToken(validUser?._id);

     const options = {
        httpOnly : true,
        secure : true
    }

    validUser.refreshToken = undefined
    validUser.verificationToken = undefined
    validUser.password = undefined

    return res.status(201)
    .cookie('accessToken' , verificationToken, options)
    .cookie('refreshToken' , refreshToken , options)
    .json(
        new ApiResponse(200 , 'User loggedIn Succesfully' , validUser)
    )


})

















// verifyEmail
// forgotPassword
// resetPassword
// checkAuth
// updateProfile

export {signup , login}