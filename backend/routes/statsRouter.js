import express from 'express';
import Stats from '../models/Stats.js'

const router = express.Router();


router.get('/', async (req,res) => {
  try {
    const response = await Stats.find({});
    res.status(200).json(response)
  }catch(error){
    res.status(400).json({ message: error.message });
  }
} );

export default router;