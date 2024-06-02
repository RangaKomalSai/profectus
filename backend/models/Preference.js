// models/StudentPreference.js
import mongoose from "mongoose";

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

export default mongoose.model("Preference", PreferenceSchema);
