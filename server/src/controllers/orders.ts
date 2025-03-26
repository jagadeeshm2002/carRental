import { Request, Response } from "express";
import Order from "../models/order";
import { getOrdersSchema, orderSchema, updateOrderSchema } from "../types/zod";
import mongoose from "mongoose";
import Car from "../models/car";
import User, { Role } from "../models/user";

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

// export const ownerGetOrders = async (req: Request, res: Response) => {
//   const ownerId = req.params.id;
//   if (!ownerId && mongoose.Types.ObjectId.isValid(ownerId)) {
//     return res.status(400).json({ message: "Id is required" });
//   }

//   try {
//     const orders = await User.aggregate([
//       // Match the owner
//       {
//         $match: { _id: new mongoose.Types.ObjectId(ownerId), role: Role.OWNER },
//       },

//       // Lookup cars owned by this user
//       {
//         $lookup: {
//           from: "cars",
//           localField: "_id",
//           foreignField: "user",
//           as: "ownedCars",
//         },
//       },

//       // Unwind the cars array
//       { $unwind: "$ownedCars" },

//       // Lookup orders for each car
//       {
//         $lookup: {
//           from: "orders",
//           localField: "ownedCars._id",
//           foreignField: "car",
//           as: "carOrders",
//         },
//       },

//       // Unwind the orders array
//       { $unwind: "$carOrders" },

//       // Lookup renter details
//       {
//         $lookup: {
//           from: "users",
//           localField: "carOrders.user",
//           foreignField: "_id",
//           as: "renter",
//         },
//       },

//       // Project only the needed fields
//       {
//         $project: {
//           orderId: "$carOrders._id",
//           carDetails: {
//             _id: "$ownedCars._id",
//             modelName: "$ownedCars.modelName",
//             year: "$ownedCars.year",
//             imageUrl: { $arrayElemAt: ["$ownedCars.imageUrl", 0] },
//           },
//           renterDetails: {
//             _id: { $arrayElemAt: ["$renter._id", 0] },
//             name: { $arrayElemAt: ["$renter.name", 0] },
//             email: { $arrayElemAt: ["$renter.email", 0] },
//           },
//           pickupDate: "$carOrders.pickupDate",
//           returnDate: "$carOrders.returnDate",
//           totalAmount: "$carOrders.totalAmount",
//           orderStatus: "$carOrders.orderStatus",
//           createdAt: "$carOrders.createdAt",
//         },
//       },

//       // Sort by order date (newest first)
//       { $sort: { createdAt: -1 } },
//     ]);
//   
//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "Orders not found" });
//     }
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export async function ownerGetOrders(req: Request, res: Response) {
  try {
    // Convert string ID to ObjectId if needed
    const ownerId = req.params.id;
    const ownerObjectId =
      typeof ownerId === "string"
        ? new mongoose.Types.ObjectId(ownerId)
        : ownerId;


    // First, check if user exists and is an owner
    const owner = await User.findOne({
      _id: ownerObjectId,
      role: Role.OWNER,
    });


    if (!owner) {
   
      return {
        success: false,
        message: "User not found or does not have owner role",
      };
    }

    // Get all cars belonging to this owner
    const ownerCars = await Car.find({ user: ownerObjectId });

    if (!ownerCars.length) {
 
      return {
        success: true,
        message: "No cars found for this owner",
        data: [],
      };
    }

    // Log the car IDs to verify
    const carIds = ownerCars.map((car) => car._id);


    // Find orders for these cars
    const orders = await Order.find({
      car: { $in: carIds },
    })
      .populate("user", "name email phone")
      .populate("car", "modelName year type imageUrl")
      .sort({ createdAt: -1 });



    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching owner car orders:", error);
    return res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
}
