import express from "express";
import User from "../models/UserModel.js";
import Subscriber from "../models/Subscriber.js";
import { protect } from "../middlewares/authMiddleware.js";
import { subscribeNewsletter } from "../utils/otpService.js";
const router = express.Router();

// Create subscriber
router.post("/", protect, async (req, res) => {
  try {
    const subscribed = await Subscriber.findOne({ email: req.body.email });
    if (subscribed) {
      res.status(409).json({ message: "You are already Subscribed" });
      return;
    }
    const subscriber = new Subscriber({ email: req.body.email });
    await subscribeNewsletter(req.body.email, req.body.name);
    await subscriber.save();
    res.status(201).json({ message: "successfully subscribed to NewsLetter" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
