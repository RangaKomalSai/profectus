import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    programmeOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    ldap: {
      type: String,
      unique: true, // Ensure ldap is unique
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "company"], // Define acceptable roles
      default: "student", // Set default role as student
    },
  },

  { timestamps: true }
);

// Pre-save middleware to set the ldap field
UserSchema.pre("save", function (next) {
  if (this.isModified("rollNumber")) {
    this.ldap = `${this.rollNumber}@iitb.ac.in`;
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
