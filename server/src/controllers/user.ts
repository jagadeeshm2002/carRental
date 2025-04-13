import { Request, Response } from "express";
import { userSchema } from "../types/zod";
import User from "../models/user";
import Car from "../models/car";
import mongoose from "mongoose";

export const userDetailsUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, result.data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) { // Fixed logical error: changed && to ||
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id, {
      password: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user favorites
export const getUserFavorites = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favourites || user.favourites.length === 0) {
      return res.status(200).json([]);
    }

    // Fetch the car details for each favorite
    const cars = await Car.find({
      _id: { $in: user.favourites }
    });

    return res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a car to user favorites
export const addToFavorites = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { carId } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Add to favorites if not already added
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: carId } }, // $addToSet ensures no duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a car from user favorites
export const removeFromFavorites = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const carId = req.params.carId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: carId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
