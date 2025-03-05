import mongoose, { Document, Schema } from "mongoose";

// Interface for Favourite Document
interface IFavourite extends Document {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
}

// Favourite Schema
const favouriteSchema = new Schema<IFavourite>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: [true, "Car is required"],
  },
});

const Favourite = mongoose.model<IFavourite>("Favourite", favouriteSchema);
export default Favourite;
