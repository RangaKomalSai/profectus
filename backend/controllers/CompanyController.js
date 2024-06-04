import Application from "../models/Application.js";
import Preference from "../models/Preference.js";
import jwt from "jsonwebtoken";

export const getCompanyApplications = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        status: false,
        message: "Unauthorized. Please Login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const companyId = decoded.companyId;

    // Find the application document for the company
    const application = await Application.findOne({ companyId: companyId });

    if (!application) {
      return res.json({
        status: true,
        message: "Some error occurred. Contact the team.",
        rollNumbers: [],
      });
    }

    // Return the roll numbers from the application document
    res.json({
      status: true,
      message: "Applications found.",
      rollNumbers: application.rollNumbers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
