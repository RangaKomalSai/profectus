import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/UserRoute.js";
import PreferenceRoute from "./routes/PreferenceRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin:
    // "https://42fa-2401-4900-1aab-debf-14a2-ae1b-e400-b745.ngrok-free.app",
    credentials: true,
  })
);
// app.use(cors());
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/api/preferences", PreferenceRoute);
app.use("/api/profile", ProfileRoute);

//DB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("!!!!!!!!!Database connected!!!!!!!"))
  .catch((err) => console.error("Database connection failed:", err));

export default app;
