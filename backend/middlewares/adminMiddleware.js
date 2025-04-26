import asyncHandler from "express-async-handler";

const admin = asyncHandler((req, res, next) => {

console.log(req.user)
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied, Admins only!");
  }
});

export { admin };
