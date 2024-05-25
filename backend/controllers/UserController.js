import User from "../models/User.js";

//for loginuser part
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller function to handle user registration
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      rollNumber,
      department,
      programmeOfStudy,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !contactNumber ||
      !rollNumber ||
      !department ||
      !programmeOfStudy ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      contactNumber,
      rollNumber,
      department,
      programmeOfStudy,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
