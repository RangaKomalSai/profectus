import Application from "../models/Application.js";
import Preference from "../models/Preference.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// export const getCompanyApplications = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.json({
//         status: false,
//         message: "Unauthorized. Please Login again.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const companyId = decoded.companyId;

//     // Find the application document for the company
//     const application = await Application.findOne({ companyId: companyId });

//     if (!application) {
//       return res.json({
//         status: true,
//         message: "Some error occurred. Contact the team.",
//         rollNumbers: [],
//       });
//     }

//     // Return the roll numbers from the application document
//     res.json({
//       status: true,
//       message: "Applications found.",
//       rollNumbers: application.rollNumbers,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: false, message: "Internal server error" });
//   }
// };

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
    const application = await Application.findOne({ companyId });

    if (!application) {
      return res.json({
        status: true,
        message: "No applications found for this company.",
        applications: [],
      });
    }

    // Get roll numbers and use them for further lookups
    const rollNumbers = application.rollNumbers;

    // Use Promise.all for parallel data fetching
    const [studentData, preferenceData] = await Promise.all([
      // Find student names for each roll number
      Promise.all(
        rollNumbers.map(async (rollNumber) => {
          const student = await User.findOne({ rollNumber }); // Replace User with your user model name
          return student ? { rollNumber, name: student.name } : null; // Handle missing students
        })
      ),
      // Find preference data for each roll number and matching companyId
      Promise.all(
        rollNumbers.map(async (rollNumber) => {
          const preference = await Preference.findOne({
            rollNumber,
            preferences: { $elemMatch: { companyId } },
          });
          return preference
            ? {
                rollNumber,
                resume: preference.resume,
                preferenceNumber: preference.preferences.find(
                  (pref) => pref.companyId === companyId
                ).preferenceNumber,
              }
            : null; // Handle missing preferences
        })
      ),
    ]);

    // Filter out null values from fetched data
    const applications = studentData
      .filter((data) => data)
      .map((data) => ({
        ...data,
        ...(preferenceData.find(
          (pref) => pref.rollNumber === data.rollNumber
        ) || {}),
      }));

    res.json({
      status: true,
      message: "Applications found.",
      applications,
    });
  } catch (error) {
    console.error("Error getting company applications:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
