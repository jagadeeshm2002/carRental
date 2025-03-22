import { Request, Response } from "express";
import { userSchema } from "../types/zod";
import User from "../models/user";
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
  if (!id && mongoose.Types.ObjectId.isValid(id)) {
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
