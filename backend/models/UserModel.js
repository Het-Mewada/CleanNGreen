import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    priceAtTime: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cart: {
      type: [CartItemSchema],
      default: [],
    },
    orders : {
      type: [],
      default: [],
    } ,
    profilePic: { type: String, default: "" },
    isBlocked: { type: Boolean, enum: [true, false], default: false },
    
  address: [
    {
      houseNo: {
        type: String,
        required: true,
        trim: true
      },
      street: {
        type: String,
        required: true,
        trim: true
      },
      locality: {
        type: String,
        required: true,
        trim: true
      },
      pincode: {
        type: Number,
        required: true,
        match: [/^\d{6}$/, 'Invalid 6-digit pincode']
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
    }
  ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
