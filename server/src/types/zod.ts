import { z } from "zod";
import { Type } from "./enums";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["user", "owner"], { message: "role is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),
  phone: z.string().optional(),
  address: z
    .object({
      no: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  driverLicense: z
    .object({
      number: z.string().optional(),
      expiryDate: z.coerce.date().optional(),
      dob: z.coerce.date().optional(),
    })
    .optional(),
  proofOfIdentity: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const carSchema = z.object({
  user: z.string({ message: "User is required" }),
  modelName: z.string().min(1, { message: "Model name is required" }),
  year: z
    .number()
    .min(2000, { message: "Year is required" })
    .max(2026, { message: "Year is required" }),
  type: z.nativeEnum(Type),
  distance: z.string().min(1, { message: "Distance is required" }),
  originalPrice: z.number().min(1, { message: "Original price is required" }),
  discountedPrice: z
    .number()
    .min(1, { message: "Discounted price is required" }),
  coupon: z.string().optional(),
  duration: z.string().min(1, { message: "Duration is required" }),
  imageUrl: z.array(z.string()).min(1, { message: "Image URL is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  coordinates: z.object({
    latitude: z.number({ message: "Latitude is required" }),
    longitude: z.number({ message: "Longitude is required" }),
  }),
  features: z.array(z.string()).optional(),
  category: z.string().min(1, { message: "Category is required" }),
});

export const carSearchSchema = z.object({
  modelName: z.string().optional(),
  year: z.coerce.number().min(2000).max(2026).optional(),
  type: z.nativeEnum(Type).optional(),
  // minDistance: z.number().min(0).optional(),
  // maxDistance: z.number().min(0).optional(),
  // minDiscountedPrice: z.number().min(0).optional(),
  // maxDiscountedPrice: z.number().min(0).optional(),
  location: z.string().optional(),
  // features: z.array(z.string()).optional(),
  // category: z.string().optional(),
  sortBy: z.enum(["price", "year", "distance", "rating"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
export const updateschema = carSchema.omit({ user: true }).partial();

export const reviewsSchema = z.object({
  user: z.string({ message: "User is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Rating is required" }),
  comment: z.string().optional(),
});
export const orderSchema = z.object({
  car: z.string({ message: "Car is required" }),
  pickupDate: z.coerce.date({ message: "Pickup date is required" }),
  returnDate: z.coerce.date({ message: "Return date is required" }),
  totalDays: z.coerce.number({ message: "Total days is required" }),
  totalAmount: z.number({ message: "Total amount is required" }),
  user: z.string({ message: "User is required" }),
});
export const getOrdersSchema = orderSchema.pick({ user: true });

export const updateOrderSchema = z.object({
  orderStatus: z.enum(["pending", "confirmed", "cancelled"]),
});
