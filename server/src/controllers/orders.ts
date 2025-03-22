import { Request, Response } from "express";
import Order from "../models/order";
import { getOrdersSchema, orderSchema, updateOrderSchema } from "../types/zod";
import mongoose from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = orderSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({ success: false, error: data.error.errors });
    }

    const { car, pickupDate, returnDate } = data.data;
    if (!(await isCarAvailable(car, pickupDate, returnDate))) {
      return res
        .status(400)
        .json({ success: false, error: "Car is not available" });
    }

    const order = await Order.create(data.data);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, error: "Order not created" });
    }

    res
      .status(201)
      .json({ success: true, data: { message: "Order created successfully" } });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const isCarAvailable = async (
  car: string,
  pickupDate: Date,
  returnDate: Date
): Promise<boolean> => {
  const overlappingOrders = await Order.find({
    car: car,
    $or: [
      { pickupDate: { $lte: returnDate }, returnDate: { $gte: pickupDate } },
      { pickupDate: { $gte: pickupDate, $lte: returnDate } },
      { returnDate: { $gte: pickupDate, $lte: returnDate } },
    ],
  });
  if (overlappingOrders.length > 0) {
    return false;
  }

  return true; // Returns true if no overlapping bookings
};

export const userGetOrders = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id && mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const orders = await Order.find({ user: id });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  res.send("getOrder");
};

export const updateOrder = async (req: Request, res: Response) => {
  const data = updateOrderSchema.safeParse(req.body);
  const id = req.params.id;
  if (!id && mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is required" });
  }
  if (!data.success) {
    res.status(400).json({ errors: data.error.errors });
    return;
  }
  try {
    const car = await Order.findByIdAndUpdate(
      { _id: id },
      { orderStatus: data.data.orderStatus },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
