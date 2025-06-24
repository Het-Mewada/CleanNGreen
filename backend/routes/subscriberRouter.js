import express from 'express';
import User from '../models/UserModel.js';
import Subscriber from '../models/Subscriber.js'
import { protect } from '../middlewares/authMiddleware.js';
import { subscribeNewsletter } from '../utils/otpService.js';
const router = express.Router();


// Create subscriber
router.post('/', protect , async (req, res) => {
  try {
    const subscribed = await User.findById(req.body.id);
    if(subscribed){
      res.status(409).json({message:"You are already Subscribed"})
      return
    }
    const subscriber = new Subscriber(req.body.email);
    await subscribeNewsletter({email:req.body.email})
    await subscriber.save();
    res.status(201).json(subscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;