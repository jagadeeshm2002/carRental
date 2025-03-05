import mongoose, { Document, Schema } from "mongoose";

// Interface for Review Document

interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}


const review = new Schema({
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
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
  },
  comment: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Review = mongoose.model<IReview>("Review", review);
export default Review;
