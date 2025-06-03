import mongoose from "mongoose";

export type DeliveryDetails = {
  fullname: string;
  email: string;
  address: string;
  city: string;
  contact : string
};
export type CartItems = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  DeliveryDetails: DeliveryDetails;
  cartItems: CartItems[];
  totalAmount: number;
  status:
     "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    DeliveryDetails: {
      email: { type: String, required: true },
      fullname : { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      contact : {type : String , require : true}
    },
    cartItems: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        imageUrl: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
