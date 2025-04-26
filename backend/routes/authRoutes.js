import express from "express";
import passport from "passport";
import  jwt from "jsonwebtoken";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyOtp } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp)
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user = req.user?.toObject ? req.user.toObject() : { ...req.user };
  const token = jwt.sign( user , process.env.JWT_SECRET, { expiresIn: '7d' });
  res.redirect(`http://localhost:5173/social-auth-success?token=${token}`);
})


export default router;
