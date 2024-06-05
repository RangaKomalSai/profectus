// models/Application.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
    index: true, // Add index for faster lookups by companyId
  },
  rollNumbers: {
    type: [String],
    required: true,
    unique: true, // Ensure each company has a unique set of roll numbers
  },
});

export default mongoose.model("Application", ApplicationSchema);
