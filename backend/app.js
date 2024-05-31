import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);

//DB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("!!!!!!!!!Database connected!!!!!!!"))
  .catch((err) => console.error("Database connection failed:", err));

export default app;
