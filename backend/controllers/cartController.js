import asyncHandler from "express-async-handler";
import Stripe from 'stripe'
import User from "../models/UserModel.js";
import Product from "../models/Product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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


export const proceedCheckout = asyncHandler(async (req, res) => {
  const { cartProducts , userId } = req.body;
console.log(cartProducts)
  const line_items = cartProducts.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.product.price * 100, // ₹ in paise
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cancel`,
    metadata: {
      userId: userId,
    },
  });

  res.json({ url: session.url });
});


export const verifyPayment = asyncHandler(async(req,res)=>{
  console.log("het mewada")
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    console.log("try block started")
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(event.type)
    } catch (err) {
      console.log("catch block started")
      console.log("Error in catch block of verify : " , err)
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment successful
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata.userId;
      console.log("payment completed")
      // Example: Clear cart, mark premium
      const user = await User.findById(userId);
      console.log("this is the user  " , user)
      if (user) {
            const newOrder = {
      items: [...user.cart],       // Copy of the cart
      orderedAt: new Date(),       // Optional: store order time
      totalAmount: user.cart.reduce((sum, item) => sum + (item.priceAtTime * item.quantity), 0) // Optional: order total
    };
        user.orders.push(newOrder)
        user.cart = [];
        await user.save();
        console.log("use saved Successfully")
      }
    }

    res.json({ received: true });
})



export const showPrevOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const populatedOrders = await Promise.all(
      user.orders.map(async (order) => {
        const populatedItems = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
              ...item,
              product,
            };
          })
        );

        return {
          ...order,
          items: populatedItems,
        };
      })
    );

    return res.status(200).json( populatedOrders );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});
