import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  registerStudent,
  loginStudent,
  loginCompany,
  verifyOTP,
  forgotPassword,
  resetPassword,
  verifyToken,
  logout,
} from "../controllers/UserController.js";
import Company from "../models/Company.js";
const router = express.Router();

const verifyStudent = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Error decoding token:", err);
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ status: false, message: "Invalid token" });
      }
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ status: false, message: "Token expired" });
      }
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        error: err.message,
      });
    }

    console.log("Decoded token: ", decoded);

    // Check if the user role is student
    if (decoded.role !== "student") {
      return res.json({
        status: false,
        message: "Access denied: not a student",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ rollNumber: decoded.username });
    if (!user) {
      return res.status(403).json({ status: false, message: "User not found" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const verifyCompany = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    console.log("token: " + token);
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Error decoding token:", err);
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ status: false, message: "Invalid token" });
      }
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ status: false, message: "Token expired" });
      }
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        error: err.message,
      });
    }

    console.log("Decoded token: ", decoded);

    // Check if the user role is student
    if (decoded.role !== "company") {
      return res.json({
        status: false,
        message: "Access denied: Only Company members allowed",
      });
    }

    // Check if the user exists
    const company = await Company.findOne({ rollNumber: decoded.username });
    if (!company) {
      return res.status(403).json({ status: false, message: "User not found" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

router.post("/register", registerStudent);
router.post("/verify-otp", verifyOTP);
router.post("/login/student", loginStudent);
router.post("/login/company", loginCompany);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-student", verifyStudent, verifyToken);
router.get("/verify-company", verifyCompany, verifyToken);
router.get("/logout", logout);

export { router as UserRouter };
