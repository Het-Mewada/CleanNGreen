import express from 'express';
import Product from '../models/Product.js'


const router = express.Router();
//fetch products
router.get('/', async (req,res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products)
  }catch(error){
    res.status(400).json({ message: err.message });
  }
} )

export default router;