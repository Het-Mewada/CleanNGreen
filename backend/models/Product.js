// models/Product.js
import mongoose from "mongoose";




const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      default: "home",
      enum: ["home", "fashion" , "clothing", "electronics", "beauty", "food", "other"], // you can adjust categories
    },
    imageUrl: {
      type: String,
      required: true,
    },
    materials: {
      type: [String],
      default: [],
    },
    shippingEcoFriendly: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    brand: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;