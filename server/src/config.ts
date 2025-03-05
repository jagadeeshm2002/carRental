import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
const result = dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

if (result.error) {
  throw new Error("Failed to load .env file");
}

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

// Export configuration with type safety
export const config = {
  database: process.env.DATABASE_URL,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
} as const;

export const database: string = config.database;
