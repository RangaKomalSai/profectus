import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes);

//Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("!!!!!!!!!Database connected!!!!!!!"))
  .catch((err) => console.error("Database connection failed:", err));

export default app;
