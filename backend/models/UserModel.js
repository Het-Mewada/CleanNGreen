import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    password: { type: String , required: function () {
      return !this.googleId;
    }  },
    gender: { type: String, enum: ["male" , "female"] , default : "male" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePic: { type: String, default: "" },
    isBlocked : {type : Boolean , enum:[true, false] , default:false}
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
