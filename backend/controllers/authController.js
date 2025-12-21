import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import { sendOTP } from "../utils/otpService.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { resetPassEmail } from "../utils/otpService.js";
const otpStorage = {};

// @desc Register new user
// @route POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if user already exists
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Send OTP
  const otp = await sendOTP(normalizedEmail);

  // Store OTP temporarily (with expiration)
  otpStorage[normalizedEmail] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    userData: {
      name,
      email: normalizedEmail,
      password,
      gender,
      role,
    },
  };

  res.status(200).json({
    message: "OTP sent to your email",
    email: normalizedEmail,
  });
});

//verify Otp
// verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if OTP exists and is not expired
  const storedData = otpStorage[normalizedEmail];
  if (!storedData || storedData.expiresAt < Date.now()) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  // Verify OTP
  if (String(storedData.otp) !== String(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Create user
  const { name, password, gender, role } = storedData.userData;
  const user = new User({
    name,
    email: normalizedEmail,
    password,
    gender,
    role: "user",
  });

  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Clean up OTP storage
  delete otpStorage[normalizedEmail];

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    role: user.role,
    token,
  });
});

// @desc Login user
// @route POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    res.status(401);
    throw new Error("Email or Password is Incorrect");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("You are blocked from using this site");
  }

  if (user.googleId) {
    res.status(400);
    throw new Error(
      "Email linked to a Google account. Please use 'Continue with Google' to log in."
    );
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Email or Password is Incorrect");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    role: user.role,
    isBlocked: user.isBlocked,
    token: generateToken(res, user._id),
  });
});

// @desc Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "Email not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await resetPassEmail(user.email, resetLink);

  res.status(200).json({ message: "Reset link sent to your email" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ error: "Token and new password are required" });
  }

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  user.password = newPassword; // assumed to be hashed via schema middleware
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Password has been reset successfully" });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
