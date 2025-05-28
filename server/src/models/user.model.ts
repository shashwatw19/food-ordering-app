import mongoose from "mongoose";
import { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { mailSender } from "../utils/mailSendet";
import { resetPasswordTemplate } from "../mail/template/resetPasswordTemplate";
dotenv.config();
export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string | undefined;
  address: string;
  city: string;
  contact: number;
  avatarImage: string | null;
  lastLogin: Date;
  isVerified?: boolean;
  resetPasswordToken: string | undefined;
  verificationToken?: string;
  refreshToken?: string;
  matchPassword: (password: string) => Promise<Boolean>;
  generateAccessToken: () => Promise<string>;
  generateRefreshToken: () => Promise<string>;
  createResetPasswordToken: () => string | undefined;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "update your city",
    },
    contact: {
      type: Number,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    address: {
      type: String,
      default: "Update your address",
    },
    avatarImage: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else if (this.password != undefined) {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    console.log("hashed Passwrod :", hashedPassword);
    this.password = hashedPassword;
    next();
  }
});

userSchema.methods.matchPassword = async function (password: string) {
  if (!password || !this.password)
    return new Error("password and hashedPassword are required");

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (): Promise<string> {
  try {
    const payload: { _id: unknown; email: string; fullname: string } = {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }

    return jwt.sign(payload, secret, { expiresIn: "1d" });
  } catch (error) {
    throw new Error("Error while generating REFRESH_TOKEN");
  }
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  try {
    const payload: { _id: unknown } = {
      _id: this._id,
    };

    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }

    return jwt.sign(payload, secret, { expiresIn: "7d" });
  } catch (error) {
    throw new Error("Error while generating access token");
  }
};

userSchema.methods.createResetPasswordToken = function (): string | undefined {
  try {
    const resetToken = crypto.randomBytes(20).toString("hex");
    if (resetToken) {
      this.resetPasswordToken = resetToken;
      return resetToken;
    }
  } catch (e) {
    console.log("Error while creating reset password token");
  }
};

const sendResetPassworLink = async (email: string, token: string): Promise<void> => {
  console.log('reached here....')  
  try {
        if (!email || !token) {
            throw new Error('Email and token are required');
        }
        console.log('reacched here in resetpassword')
        await mailSender(email, 'Reset Your Password', token);
        console.log('Reset password mail sent successfully');
    } catch (err) {
        console.log('error while sending verification mail');
        throw err
    }
}
userSchema.pre("save", async function (next) {
  try{
     if (this.isModified("resetPasswordToken") && this.resetPasswordToken) 
      await sendResetPassworLink(this.email , resetPasswordTemplate(this.resetPasswordToken))
    console.log('reached here')
  next();
  }catch (error : any) {
        console.error('Pre-save hook error:', error);
        next(error); // Pass error to next middleware
    }
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
