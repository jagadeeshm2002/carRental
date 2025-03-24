import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

// Export configuration with type safety
export const config = {
  database: process.env.DATABASE_URL,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  jwt_secret: process.env.JWT_SECRET,
} as const;

export const database: string = config.database;
