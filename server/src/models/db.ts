import mongoose from "mongoose";
import { database } from "../config";

const connectDb = async () => {
  try {
    await mongoose.connect(database);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDb;
