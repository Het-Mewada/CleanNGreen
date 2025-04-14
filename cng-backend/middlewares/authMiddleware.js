import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = await User.findById(decoded._id || decoded.id).select("-password");
    console.log(req.user)
    next();
  } catch (error) {
    throw new Error("Not authorized, token failed");
  }
});

export { protect };