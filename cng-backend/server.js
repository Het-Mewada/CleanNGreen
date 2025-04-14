import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

// Import passport config (important!)
import "./config/passport.js";

dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: true, // 🔥 Better than "*", allows credentials to work
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Session must come BEFORE passport
app.use(
  session({
    secret: "keyboard cat", // ✅ replace with env variable in production
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/home", projectRoutes);

// ✅ Static folder for uploaded files
app.use("/uploads", express.static("uploads"));

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
