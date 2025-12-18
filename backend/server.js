import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import productRouter from "./routes/productRouter.js";
import subscriberRouter from "./routes/subscriberRouter.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { verifyPayment } from "./controllers/cartController.js";
import newsRoutes from "./routes/newsRoutes.js";
import "./config/passport.js";

dotenv.config();
const app = express();
app.set("trust proxy", 1);
// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://eco-sphere-official.netlify.app",
    ],
    credentials: true,
  })
);

app.post(
  "/api/cart/webhook",
  express.raw({ type: "application/json" }),
  verifyPayment
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/news", newsRoutes);

// ✅ Static folder for uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRouter);
app.use("/api/subscribe", subscriberRouter);

// ✅ Test route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// ✅ Error handling middleware (good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
