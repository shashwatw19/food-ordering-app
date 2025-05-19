import mongoose from "mongoose";
import { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import   jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  address: string;
  city: string;
  contact: number;
  avatarImage: string;
  lastLogin: Date;
  isVerified?: boolean;
  resetPasswordToken?: string;
  verificationToken?: string;
  refreshToken?: string;
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

  const hashedPassword = bcrypt.hashSync(this.password, 10);
  console.log("hashed Passwrod :", hashedPassword);
  this.password = hashedPassword;
  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  if (!password || !this.password)
    return new Error("password and hashedPassword are required");

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function(): Promise<string> {
  try {
    const payload : { _id : string}= {
      _id: this._id
    };
    
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;
    
    if (!secret || !expiry) {
      throw new Error('ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is not defined');
    }
    
    const token = jwt.sign(payload, secret, { expiresIn: expiry });
    return token;
  } catch (error) {
    throw new Error('Error while generating access token');
  }
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
