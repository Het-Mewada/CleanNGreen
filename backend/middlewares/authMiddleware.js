import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token =", token);

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user || decoded._id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found, unauthorized");
    }

    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export { protect };
