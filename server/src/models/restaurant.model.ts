import mongoose from "mongoose";
import { Document } from "mongoose";
export interface IRestautrant extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menu: mongoose.Schema.Types.ObjectId[];
}

const restaurantSchema = new mongoose.Schema<IRestautrant>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: Number,
  },
  cuisines: [
    {
      type: String,
      required: true,
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  ],
},{timestamps : true});

export const Restaurant = mongoose.model<IRestautrant>("Restaurant", restaurantSchema);
