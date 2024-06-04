// models/StudentPreference.js
import mongoose from "mongoose";
import Application from "./Application.js";

const PreferenceSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    type: [
      {
        company: {
          type: String,
          required: true,
        },
        companyId: {
          type: String,
          required: true,
        },
        preferenceNumber: {
          type: Number,
          required: true,
        },
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },
  resume: {
    type: String,
    required: [true, "Resume is required"],
  },
});

function arrayLimit(val) {
  return val.length <= 5;
}

PreferenceSchema.post("save", async function (preference, next) {
  const updatedCompanyIds = preference.preferences.map(
    (pref) => pref.companyId
  );

  // Update applications collection for each company in the preference
  for (const companyId of updatedCompanyIds) {
    await updateApplication(companyId, preference.rollNumber);
  }

  next();
});

async function updateApplication(companyId, rollNumber) {
  try {
    // Find or create the application document for the company
    const application = await Application.findOneAndUpdate(
      { companyId },
      { $addToSet: { rollNumbers: rollNumber } }, // Add rollNumber if not already present
      { upsert: true, new: true } // Create if not found, return updated document
    );

    // Alternative (if unique set of rollNumbers is not required):
    // await application.updateOne({ $push: { rollNumbers: rollNumber } });
  } catch (error) {
    console.error("Error updating applications:", error);
  }
}

export default mongoose.model("Preference", PreferenceSchema);
