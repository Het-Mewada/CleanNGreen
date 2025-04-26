import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ verify token
    console.log("decoded : " , decoded )
    req.user = await User.findById(decoded.user || decoded._id).select("-password");
    console.log("user  : " + req.user)
    
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
