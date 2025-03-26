import express from "express";
import connectDb from "./models/db";
import cookieParser from "cookie-parser";

import cors from "cors";
import router from "./routers/index";

const app = express();

// Middleware

app.use(cors({ origin: ["http://localhost:5173", "https://dl6ecdmuyksf1.cloudfront.net","https://car-rental-kohl-eta.vercel.app"],credentials: true ,methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Origin', 
    'X-Requested-With'
  ]}));

app.use(express.json());
app.use(cookieParser());

connectDb();
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
