import { Request, Response } from "express";
import { signinSchema, registerSchema } from "../types/zod";
import Jwt from "jsonwebtoken";
import User from "../models/user";
import { config } from "../config";
export const signinController = async (req: Request, res: Response) => {
  const data = signinSchema.safeParse(req.query);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  try {
    const user = await User.findOne(
      { email: data.data.email },
      { password: 1, role: 1, name: 1, email: 1 }
    );
    console.log(user);
    if (!user) {
      res.status(401).json({ message: "Invalid email " });
      return;
    }

    const isMatch = await user.comparePassword(data.data.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const acessToken = Jwt.sign(
      { email: user.email, role: user.role },
      config.jwt_secret || "",
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = Jwt.sign(
      { email: user.email, role: user.role },
      config.jwt_secret || "",
      {
        expiresIn: "7d",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const response = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login successfull",
      acessToken,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const registerController = async (req: Request, res: Response) => {
  const data = registerSchema.safeParse(req.body);
  if (data.error) {
    res.status(400).json(data.error);
    return;
  }
  try {
    const existingUser = await User.findOne({ email: data.data.email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const user = await User.create(data.data);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const refreshController = async (req: Request, res: Response) => {
  const refeshToken = req.cookies.refreshToken;

  if (!refeshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = Jwt.verify(refeshToken, "secret") as Jwt.JwtPayload;
    const acessToken = Jwt.sign({ email: decoded.email }, "secret", {
      expiresIn: "1h",
    });
    res.json({ acessToken });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
