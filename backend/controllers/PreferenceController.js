// controllers/preferencesController.js
import Preference from "../models/Preference.js";
import jwt from "jsonwebtoken";

export const savePreferences = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rollNumber = decoded.username;
    const { preferences, resume } = req.body;

    if (
      !Array.isArray(preferences) ||
      preferences.length > 5 ||
      preferences.length < 5
    ) {
      return res.json({
        status: false,
        message: "You need to select 5 Preferences",
      });
    }

    if (!resume) {
      return res.json({ status: false, message: "Resume is required" });
    }

    let studentPreference = await Preference.findOne({ rollNumber });

    if (studentPreference) {
      return res.json({
        status: false,
        message: "You have already submitted your preferences",
      });
    }

    studentPreference = new Preference({ rollNumber, preferences, resume });
    await studentPreference.save();

    res
      .status(200)
      .json({ status: true, message: "Applied successfully. Check Profile" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPreferences = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rollNumber = decoded.username;

    // Query the Preferences model to find preferences associated with the roll number
    const preferences = await Preference.findOne({ rollNumber });

    if (preferences && Array.isArray(preferences.preferences)) {
      // Return the preferences array to the frontend
      res.json({ preferences: preferences.preferences });
    } else {
      // If preferences is null or not an array, return an empty array
      res.json({ preferences: [] });
    }
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
