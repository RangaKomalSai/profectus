// controllers/preferencesController.js
import Preference from "../models/Preference.js";
import Company from "../models/Company.js";
import jwt from "jsonwebtoken";

export const savePreferences = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        status: false,
        message: "Unauthorized. Please Login again.",
      });
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

    // Check if resume link contains "https"
    if (!resume.startsWith("https://")) {
      return res.json({
        status: false,
        message: "Enter a correct link for resume",
      });
    }

    let studentPreference = await Preference.findOne({ rollNumber });

    if (studentPreference) {
      return res.json({
        status: false,
        message: "You have already submitted your preferences",
      });
    }

    const updatedPreferences = [];
    for (const pref of preferences) {
      const company = await Company.findOne({ name: pref.company });
      console.log(company);
      if (!company) {
        return res.status(400).json({
          status: false,
          message: `Company ${pref.company} not found`,
        });
      }
      updatedPreferences.push({
        companyId: company.companyId,
        company: company.name,
        preferenceNumber: pref.preferenceNumber,
      });
    }

    studentPreference = new Preference({
      rollNumber: rollNumber,
      preferences: updatedPreferences,
      resume,
    });

    try {
      await studentPreference.save();

      res
        .status(200)
        .json({ status: true, message: "Applied successfully. Check Profile" });
    } catch (saveError) {
      console.error("Error saving student preference:", saveError);
      return res
        .status(500)
        .json({ status: false, message: "Failed to save preferences" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getPreferences = async (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rollNumber = decoded.username;

    // Query the Preferences model to find preferences associated with the roll number
    const preferences = await Preference.findOne({ rollNumber: rollNumber });

    if (preferences && Array.isArray(preferences.preferences)) {
      // Return the preferences array to the frontend
      // console.log(preferences.preferences);
      res.json({
        preferences: preferences.preferences,
      });
    } else {
      // If preferences is null or not an array, return an empty array
      res.json({ preferences: [] });
    }
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
