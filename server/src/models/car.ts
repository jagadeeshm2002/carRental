import mongoose, { Document, Schema } from "mongoose";

// Interface for Car Document
import { Type, Category, Duration, Features } from "../types/enums";

export interface ICar extends Document {
  user: mongoose.Types.ObjectId;
  modelName: string;
  year: number;
  type: Type;
  distance: string;
  originalPrice: number;
  discountedPrice: number;
  coupon: string;
  duration: Duration;
  imageUrl: string[];
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  features: Features[];
  category: Category;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Car Schema
const carSchema = new Schema<ICar>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    
    modelName: {
      type: String,
      required: [true, "Car model is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    type: {
      type: String,
      required: [true, "Car type is required"],
      trim: true,
      default: Type.SEDAN,
    },

    distance: {
      type: String,
      required: [true, "Distance is required"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Discounted price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      default: Duration.DAILY,
    },
    imageUrl: [
      {
        type: String,
        required: [true, "Image URL is required"],
      },
    ],
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
      },
    },
    features: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: Category.ECONOMY,
    },
    active: {
      type: Boolean,
      default: true,
    },
    coupon: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
carSchema.index({ location: 1 });
carSchema.index({ category: 1 });
carSchema.index({
  model: "text",
  type: "text",
  category: "text",
}); // Enable text search on these fields

// Create and export the Car model
const Car = mongoose.model<ICar>("Car", carSchema);
export default Car;
