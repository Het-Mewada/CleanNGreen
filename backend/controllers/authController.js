import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import { sendOTP } from "../utils/otpService.js";
import jwt from "jsonwebtoken"
const otpStorage = {};

// @desc Register new user
// @route POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log("request body : " + req.body)
    const { name, email, password, gender , role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Send OTP
    const otp = await sendOTP(email);
    
    // Store OTP temporarily (with expiration)
    otpStorage[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiration
      userData: { name, email, password,gender, role }
    };

    res.status(200).json({ 
      message: 'OTP sent to your email', 
      email 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//verify Otp
const verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP exists and is not expired
    const storedData = otpStorage[email];
    if (!storedData || storedData.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user
    const { name, password,gender, role } = storedData.userData;
    const user = new User({ name, email, password, role ,gender });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Clean up
    delete otpStorage[email];

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender:user.gender,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// @desc Login user
// @route POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });



  if (!user) {
    throw new Error("No User Exist with this Email")
  }

  if(user.isBlocked){
    throw new Error("You are blocked from using this site")
  }

  if(user.googleId){
    throw new Error("This email is already linked to a Google account. Please log in using the 'Continue with Google' option.");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
      isBlocked : user.isBlocked,
      token : generateToken(res , user._id)
    });
  } else {
    throw new Error("Incorrect Password");
  }
});

// @desc Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
});

export { registerUser, loginUser, logoutUser , verifyOtp };
