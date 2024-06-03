import User from "../models/User.js";
import OTP from "../models/OTP.js";
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";
import generateOTP from "../services/generateOTP.js";
import { response } from "express";

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      rollNumber,
      department,
      year,
      programmeOfStudy,
      password,
      confirmPassword,
    } = req.body;

    if (
      !name ||
      !contactNumber ||
      !rollNumber ||
      !department ||
      !year ||
      !programmeOfStudy ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with the provided rollnumber already exists
    const existingUser = await User.findOne({ rollNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this Roll Number" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      contactNumber,
      rollNumber,
      department,
      year,
      programmeOfStudy,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    try {
      const otp = generateOTP();
      const ldapEmail = newUser.ldap;
      await sendEmail(
        ldapEmail,
        "Verification OTP for registering to Profectus | Abhyuday, IIT Bombay",
        `Your OTP for verification is ${otp}. It is valid for only 10 minutes.`
      );

      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      const otpEntry = new OTP({
        email: ldapEmail,
        otp: otp,
        expiresAt: expiresAt,
      });
      await otpEntry.save();

      return res.status(201).json({
        status: true,
        message: "User registered successfully and email sent.",
        email: ldapEmail,
      });
    } catch (error) {
      console.log("Error sending OTP email:", error);
      await User.findByIdAndDelete(newUser._id);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("Received email:", email);
    console.log("Received OTP:", otp);

    const otpEntry = await OTP.findOne({ email: email, otp: otp });

    if (!otpEntry) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    // OTP is valid
    await OTP.deleteOne({ email, otp }); // Remove the OTP from the database after verification

    //assigning a token
    const user = await User.findOne({ ldap: email });
    const token = jwt.sign(
      { username: user.rollNumber, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).send({
      status: true,
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "OTP verification failed", error });
  }
};

export const loginStudent = async (req, res) => {
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

    const token = jwt.sign(
      { username: user.rollNumber, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.json({ status: true, message: "login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    if (password !== company.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { companyId: company._id, email: company.email, role: company.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ ldap: email });
    if (!user) {
      return res.json({ message: "This LDAP Email is not yet registered." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    try {
      await sendEmail(
        email,
        "Request for resetting your password | Profectus | Abhyuday, IIT Bombay",
        `Please click here to set a new password for your account. Please note that link will expire in 10 minutes. \nhttp://localhost:3000/reset-password/${token}`
      );
      res.json({
        status: true,
        message: "Email sent successfully. Please check.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

    return res.json({ status: true, message: "updated password successfully" });
  } catch (error) {
    return res.json("invalid token");
  }
};

export const verifyToken = async (req, res) => {
  return res.json({ status: true, message: "authorized" });
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie named 'token'
    res.clearCookie("token", {
      httpOnly: true,
    });

    // Send a response indicating successful logout
    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    // Handle any potential errors
    return res
      .status(500)
      .json({ status: false, message: "Logout failed", error: error.message });
  }
};
