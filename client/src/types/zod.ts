import { z } from "zod";

// Define enum for car types
export enum Type {
    SEDAN = "sedan",
    SUV = "suv",
    HATCHBACK = "hatchback",
    COUPE = "coupe",
    CONVERTIBLE = "convertible",
    PICKUP = "pickup truck",
    MINIVAN = "minivan",
    ELECTRIC = "electric",
    SPORTS = "sports car",
    LUXURY = "luxury"
  }

// Define available features
export const availableFeatures = [
  "Air Conditioning",
  "Bluetooth",
  "Cruise Control",
  "Navigation",
  "Backup Camera",
  "Heated Seats",
  "Sunroof",
  "Leather Seats",
  "Keyless Entry",
  "Parking Sensors",
];

// Define available categories
export const availableCategories = [
  "Sedan",
  "SUV",
  "Truck",
  "Coupe",
  "Van",
  "Hatchback",
  "Convertible",
  "Luxury",
  "Economy",
];

// Create Zod schema for car search form
export const carSearchSchema = z.object({
  // Search input for model name

  modelName: z.string().optional(),

  // Year filter
  year: z.number().min(2000).max(new Date().getFullYear()).optional(),

  // Type filter (new, used, certified)
  type: z.enum(Object.values(Type) as [string, ...string[]]).optional(),

  // // Price range filter
  // minPrice: z.number().min(0).optional(),
  // maxPrice: z.number().positive().optional(),

  // // Distance/Mileage range filter
  // minDistance: z.number().min(0).optional(),
  // maxDistance: z.number().positive().optional(),

  // // Features multi-select filter
  // features: z
  //   .array(z.enum(availableFeatures as [string, ...string[]]))
  //   .optional(),

  // // Category filter
  // categories: z.enum(availableCategories as [string, ...string[]]).optional(),

  // Location filter
  location: z.string().optional(),

  // Rating filter
  minRating: z.number().min(0).max(5).optional(),

  // Sorting options
  sortBy: z.enum(["price", "year", "rating", "distance"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
});

// Type for the form values based on the zod schema
export type CarSearchFormValues = z.infer<typeof carSearchSchema>;
