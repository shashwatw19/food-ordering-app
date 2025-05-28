import mongoose ,{Schema , Types}from "mongoose";
import { Document } from "mongoose";

export interface IRestautrant extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  deliveryTime: number;
  country : string,
  address : string
  cuisines: string[];
  imageUrl: string | null;
  menu:  mongoose.Schema.Types.ObjectId[]
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
  country : {
    type : String,
    required : true
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
    
  },
  address : {
    type : String,
    required : true
  },
  menu: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Menu'
  }],
},{timestamps : true});

export const Restaurant = mongoose.model<IRestautrant>("Restaurant", restaurantSchema);
