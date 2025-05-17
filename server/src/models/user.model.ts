import mongoose from "mongoose";
import { Document, Model } from "mongoose";
export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  address: string;
  city: string;
  contact: Number;
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
    default : "update your city",
    },
    contact: {
      type: Number,
      required: true,
    },
    lastLogin: {
      type: Date,
      default : Date.now()
    },
    address: {
      type: String,
      default : "Update your address"
    },
    avatarImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
