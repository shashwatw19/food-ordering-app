import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError'    
import { asyncHandler } from '../utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { User } from '../models/user.model'
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: unknown;
        email: string;
        fullname: string;
      };
    }
  }
}

const verifyJwt = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.verificationToken 
        console.log("token :",token)
        if(!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        const secret = process.env.ACCESS_TOKEN_SECRET as  jwt.Secret;
        console.log("secret : " , secret)
        try {
            const decodedToken = jwt.verify(token, secret) as JwtPayload;
            console.log(decodedToken)
            const user = await User.findOne({_id : decodedToken._id})
                .select("-password -refreshToken");

            if (!user) {
                throw new ApiError(401, 'Invalid Access Token');
            }

            req.user = {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            };

            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new ApiError(401, 'Invalid token signature');
            } else if (error instanceof jwt.TokenExpiredError) {
                throw new ApiError(401, 'Token has expired');
            } else {
                throw error;
            }
        }
    } catch (error) {
        next(error);
    }
})

export { verifyJwt }

