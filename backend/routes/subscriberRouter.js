import express from 'express';
import Subscriber from '../models/Subscriber.js'

const router = express.Router();
// Create subscriber
router.post('/', async (req, res) => {
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.status(201).json(subscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;