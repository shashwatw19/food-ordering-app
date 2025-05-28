import mongoose from "mongoose";

export interface IMenu extends Document {
  name: string;
  description: string;
  price: Number;
  imageUrl: string | null;
  _id ?: mongoose.Schema.Types.ObjectId 
}

const menuSchema = new mongoose.Schema<IMenu>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
});
export const Menu = mongoose.model<IMenu>("Menu", menuSchema);
