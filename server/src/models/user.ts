import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export enum Role {
  USER = "user",
  OWNER = "owner",
  ADMIN = "admin",
}

export interface IUser extends Document {
  name: string;
  email: string;
  address?: {
    no: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  driverLicense?: {
    number: string;
    expiryDate: Date;
    dob: Date;
  };
  proofOfIdentity?: string; // Passport/Aadhar/Voter ID
  imageUrl?: string; // Profile picture URL
  password: string;
  role: Role;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't return password in queries by default
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    address: {
      no: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    driverLicense: {
      number: {
        type: String,
        trim: true,
      },
      expiryDate: {
        type: Date,
      },
      dob: {
        type: Date,
      },
    },
    proofOfIdentity: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
