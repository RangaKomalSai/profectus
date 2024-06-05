import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "company"], // Define acceptable roles
      default: "company", // Set default role as student
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
