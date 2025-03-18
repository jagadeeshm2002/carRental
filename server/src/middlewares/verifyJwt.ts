import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config";
type Role = "user" | "owner" | "admin";

interface JwtPayload {
  email: string;
  role: Role;
}

export interface ExtendedRequest extends Request {
  user?: JwtPayload;
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.jwt_secret || "") as JwtPayload;
    (req as ExtendedRequest).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
