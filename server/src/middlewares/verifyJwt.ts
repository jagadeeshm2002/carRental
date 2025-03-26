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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_secret || "") as JwtPayload;

    (req as ExtendedRequest).user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.error("JWT verification error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
