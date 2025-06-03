import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Product from "../models/Product.js";

export const addItem = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) return res.status(404).json({ message: 'User or product not found' });

    const existingItem = user.cart.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({
        product: product._id,
        quantity,
        priceAtTime: product.price
      });
    }

    await user.save();
    res.status(200).json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

export const deleteItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const initialLength = user.cart.length;

    // Filter out the product
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    if (user.cart.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await user.save();
    console.log(user.cart)
    res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})


export const showCartItems = asyncHandler(async(req,res)=>{
  const userId = req.query.userId;
console.log("User ID : " , userId)
  const user = await User.findById(userId)
     .populate("cart.product");

  console.log("Display cart item : " , user.cart)

  res.status(200).json(user.cart)
})

