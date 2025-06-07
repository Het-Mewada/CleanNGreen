import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const addProducts = asyncHandler(async (req,res) => {
    try {
        const {
          name,
          description,
          price,
          category,
          imageUrl,
          materials,
          certifications,
          carbonFootprint,
          shippingEcoFriendly,
          stock,
          brand
        } = req.body;
    
        // Basic validation
        if (!name || !description || !price || !imageUrl) {
          return res.status(400).json({ message: 'Please fill in all required fields.' });
        }
    
        const product = new Product({
          name,
          description,
          price,
          category,
          imageUrl,
          materials,
          certifications,
          carbonFootprint,
          shippingEcoFriendly,
          stock,
          brand
        });
    
        const savedProduct = await product.save();
    
        res.status(201).json({
          message: 'Product created successfully',
          product: savedProduct
        });
    
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error. Could not add product.' });
      }
})