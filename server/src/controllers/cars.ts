import { Request, Response } from "express";
import { carSchema, reviewsSchema, updateschema } from "../types/zod";
import Car from "../models/car";
import { carSearchSchema } from "../types/zod";
import Review from "../models/review";
import Order from "../models/order";
import User from "../models/user";
import { z } from "zod";
import mongoose from "mongoose";

export const createCar = async (req: Request, res: Response) => {
  const data = carSchema.safeParse(req.body);

  if (data.error) {
    res.status(400).json(data.error);
    return;
  }

  try {
    const user = await User.findById(data.data.user);
    if (!user || user.role !== "owner") {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const car = await Car.create(data.data);

    if (!car) {
      res.status(400).json({ message: "Car not created" });
      return;
    }
    res.status(201).json({ message: "Car created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getCars = async (req: Request, res: Response) => {
  const params = carSearchSchema.safeParse(req.query);

  if (!params.success) {
    return res.status(400).json({ errors: params.error.format() });
  }

  try {
    const {
      modelName,
      year,
      type: typeOfCar,
      // minDistance,
      // maxDistance,
      // minDiscountedPrice,
      // maxDiscountedPrice,
      location,
      // features,
      // category,
      sortBy,
      sortOrder,
    } = params.data;

    // Build the query object based on the search parameters
    const query: Record<string, any> = {};

    // Text matching queries
    if (modelName) query.modelName = { $regex: modelName, $options: "i" }; // Case-insensitive partial match
    if (typeOfCar && typeOfCar !== "all") query.type = typeOfCar; // Exact match for the specified type
    if (location) query.location = { $regex: location, $options: "i" }; // Case-insensitive partial match
    // if (category) query.category = { $regex: category, $options: "i" }; // Case-insensitive partial match
    if (year) query.year = year;

    // Numeric range queries
    // if (minDistance !== undefined || maxDistance !== undefined) {
    //   query.distance = {};
    //   if (minDistance !== undefined) query.distance.$gte = minDistance;
    //   if (maxDistance !== undefined) query.distance.$lte = maxDistance;
    // }

    // if (minDiscountedPrice !== undefined || maxDiscountedPrice !== undefined) {
    //   query.discountedPrice = {};
    //   if (minDiscountedPrice !== undefined)
    //     query.discountedPrice.$gte = minDiscountedPrice;
    //   if (maxDiscountedPrice !== undefined)
    //     query.discountedPrice.$lte = maxDiscountedPrice;
    // }

    // Array contains query
    // if (features && features.length > 0) {
    //   query.features = { $all: features }; // Match all specified features
    // }

    // Create sort options
    const sortOptions: Record<string, 1 | -1> = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Execute query with pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [cars, totalCount] = await Promise.all([
      Car.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
      Car.countDocuments(query),
    ]);

    if (!cars || cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No cars found matching your criteria" });
    }

    return res.status(200).json({
      cars,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error in getCars controller:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? String(error) : undefined,
    });
  }
};

export const getCar = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    const car = await Car.findById(id);
    const orderedDate = await Order.find({
      car: id,
      pickupDate: { $gte: new Date() },
    });
    const reviews = await Review.find({ car: id });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car, reviews, orderedDate });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is required" });
  }
  const data = updateschema.safeParse(req.body);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  try {
    const car = await Car.findByIdAndUpdate(id, data.data, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const deleteCar = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Id is required" });
//   }
//   try {
//     const car = await Car.findByIdAndDelete(id);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }
//     res.status(200).json({ message: "Car deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const createReview = async (req: Request, res: Response) => {
  const car = req.params.id;
  if (!car || !mongoose.Types.ObjectId.isValid(car)) {
    return res.status(400).json({ message: "Id is required" });
  }

  const data = reviewsSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json(data.error);
    return;
  }
  try {
    const { user, rating, comment } = data.data;
    const review = await Review.create({ user, car, rating, comment });
    if (!review) {
      res.status(400).json({ message: "Review not created" });
      return;
    }
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getReviews = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    const reviews = await Review.find({ car: id });
    if (!reviews) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
