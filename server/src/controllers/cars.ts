import { Request, Response } from "express";
import { carSchema, reviewsSchema } from "../types/zod";
import Car from "../models/car";
import { carSearchSchema } from "../types/zod";
import Review from "../models/review";
import Order from "../models/order";

export const createCar = async (req: Request, res: Response) => {
  const data = carSchema.safeParse(req.body);
  console.log(data);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  try {
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
  const prams = carSearchSchema.safeParse(req.query);
  console.log(prams);
  if (prams.error) {
    res.status(400).json(prams.error);
    return;
  }
  try {
    const {
      modelName,
      year,
      type,
      minDistance,
      maxDistance,
      minDiscountedPrice,
      maxDiscountedPrice,
      location,
      features,
      category,
      sortBy,
      sortOrder,
    } = prams.data;
    const query: any = {};
    // Build the query object based on the search parameters
    if (modelName) query.modelName = modelName; // Exact match for model name
    if (year) query.year = year; // Exact match for year
    if (type) query.type = type; // Exact match for car type

    // Range query for distance
    if (minDistance) query.distance = { $gte: minDistance };
    if (maxDistance) query.distance = { ...query.distance, $lte: maxDistance };

    // Range query for discounted price
    if (minDiscountedPrice)
      query.discountedPrice = { $gte: minDiscountedPrice };
    if (maxDiscountedPrice)
      query.discountedPrice = {
        ...query.discountedPrice,
        $lte: maxDiscountedPrice,
      };

    if (location) query.location = location; // Exact match for location
    if (features) query.features = { $in: features }; // Match any of the specified features
    if (category) query.category = category; // Exact match for category

    // Sorting options
    if (sortBy) query.sortBy = sortBy;
    if (sortOrder) query.sortOrder = sortOrder;

    // This method efficiently builds a flexible query based on user input
    const cars = Car.find(query);
    if (!cars) {
      res.status(400).json({ message: "Cars not found" });
      return;
    }
    res.status(200).json(cars);
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getCar = async (req: Request, res: Response) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const data = carSchema.safeParse(req.body);
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

export const deleteCar = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createReview = async (req: Request, res: Response) => {
  const data = reviewsSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json(data.error);
    return;
  }
  try {
    const { user, car, rating, comment } = data.data;
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
