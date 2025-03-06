import { Request, Response } from "express";
import { z } from "zod";
import Car from "../models/car";
import Order from "../models/order";

const orderSchema = z.object({
  car: z.string({ message: "Car is required" }),
  pickupDate: z.date({ message: "Pickup date is required" }),
  returnDate: z.date({ message: "Return date is required" }),
  totalDays: z.number({ message: "Total days is required" }),
  totalAmount: z.number({ message: "Total amount is required" }),
  orderStatus: z.string({ message: "Order status is required" }),
  user: z.string({ message: "User is required" }),
});

const creatOrder = async (req: Request, res: Response) => {
  const data = orderSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({ errors: data.error.errors });
    return;
  }
  try {
    const { car, pickupDate, returnDate } = data.data;
    if (!isCarAvailable(car, pickupDate, returnDate)) {
      return res.status(400).json({ message: "Car is not available" });
    }
    const order = await Order.create(data.data);
    if (!order) {
      return res.status(400).json({ message: "Order not created" });
    }
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {}
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

  return overlappingOrders.length === 0; // Returns true if no overlapping bookings
};

const getOrdersSchema = z.object({
  user: z.string({ message: "User is required" }),
});
const getOrders = async (req: Request, res: Response) => {
  const data = getOrdersSchema.safeParse(req.query);
  if (!data.success) {
    res.status(400).json({ errors: data.error.errors });
    return;
  }
  try {
    const { user } = data.data;
    const orders = await Order.find({ user: user });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrder = async (req: Request, res: Response) => {
  res.send("getOrder");
};
const updateOrderSchema = z.object({
  orderStatus: z.string({ message: "Order status is required" }),
  id: z.string({ message: "Id is required" }),
});
const updateOrder = async (req: Request, res: Response) => {
  const data = updateOrderSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ errors: data.error.errors });
    return;
  }
  try {
    const car = await Order.findByIdAndUpdate(
      { _id: data.data.id },
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
