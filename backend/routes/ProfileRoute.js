import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const profileDetails = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rollNumber = decoded.username;

    const user = await User.findOne({ rollNumber: rollNumber });

    if (user) {
      const {
        name,
        department,
        rollNumber,
        yearOfStudy,
        contactNumber,
        programmeOfStudy,
      } = user;
      res.json({
        name,
        department,
        rollNumber,
        yearOfStudy,
        contactNumber,
        programmeOfStudy,
      });
    } else {
      // If user is not found, return an error
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/", profileDetails);

export default router;
