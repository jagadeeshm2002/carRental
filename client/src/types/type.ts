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
  LUXURY = "luxury",
}
export enum Category {
  ECONOMY = "economy",
  STANDARD = "standard",
  PREMIUM = "premium",
  LUXURY = "luxury",
  FAMILY = "family",
  BUSINESS = "business",
  OFF_ROAD = "off-road",
  ELECTRIC = "electric",
}
export enum Duration {
  HOURLY = "per hour",
  DAILY = "per day",
  WEEKLY = "per week",
  MONTHLY = "per month",
}
export enum Features {
  AUTOMATIC_TRANSMISSION = "automatic transmission",
  MANUAL_TRANSMISSION = "manual transmission",
  AIR_CONDITIONING = "air conditioning",
  BLUETOOTH = "bluetooth",
  BACKUP_CAMERA = "backup camera",
  GPS_NAVIGATION = "gps navigation",
  HEATED_SEATS = "heated seats",
  LEATHER_SEATS = "leather seats",
  SUNROOF = "sunroof",
  APPLE_CARPLAY = "apple carplay",
  ANDROID_AUTO = "android auto",
  CRUISE_CONTROL = "cruise control",
  PARKING_SENSORS = "parking sensors",
  FOUR_WHEEL_DRIVE = "four-wheel drive",
  ELECTRIC_CHARGING = "electric charging",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}
export enum paymentMethod {
  CASH = "cash",
  CARD = "card",
  UPI = "upi",
}
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export interface Car {
  _id: string;
  modelName: string;
  year: number;
  type: Type;
  distance: number;
  discountedPrice: number;
  originalPrice: number;
  location: string;
  features: string[];
  category: string;
  rating: number;
  imageUrl: string;
  // Add other properties as needed
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CarDetails {
  _id: string;
  user: string;
  modelName: string;
  year: number;
  type: string;
  distance: string;
  originalPrice: number;
  discountedPrice: number;
  duration: string;
  imageUrl: string[];
  location: string;
  coordinates: Coordinates;
  features: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Review {
  user: string;
  car: string;
  rating: number;
  comment: string;
}

export interface UserDetail {
  name: string;
  email: string;
  phone: string;
  address: {
    no: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  driverLicense: {
    number: string;
    expiryDate: Date;
    dob: Date;
  };
  proofOfIdentity: string; // Passport/Aadhar/Voter ID
  imageUrl: string; // Profile picture URL
}
