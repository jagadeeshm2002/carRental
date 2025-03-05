import mongoose, { Document, Schema } from "mongoose";
import { PaymentStatus, paymentMethod } from "../types/enums";

interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: paymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

const payment = new Schema<IPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Order is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"],
  },
  paymentMethod: {
    type: String,
    enum: Object.values(paymentMethod),
    required: [true, "Payment method is required"],
  },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model<IPayment>("Payment", payment);
export default Payment;
