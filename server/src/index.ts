import express from "express";
import connectDb from "./models/db";


import cors from "cors";
import router from "./routers/index";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDb();
app.use("/api/v1",router)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
