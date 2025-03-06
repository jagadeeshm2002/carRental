import mongoose, { Document, Schema } from "mongoose";
import { OrderStatus } from "../types/enums";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  pickupDate: Date;
  returnDate: Date;
  totalDays: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
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
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    returnDate: {
      type: Date,
      required: [true, "Return date is required"],
    },
    totalDays: {
      type: Number,
      required: [true, "Total days is required"],
      min: [1, "Total days must be at least 1"],
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
