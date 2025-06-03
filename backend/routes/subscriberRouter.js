import express from 'express';
import Subscriber from '../models/Subscriber.js'
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Create subscriber
router.post('/', protect , async (req, res) => {
  console.log(req.body);
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.status(201).json(subscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;