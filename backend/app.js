/**
 * ==========================================================
 *                  EXPRESS APPLICATION
 * ==========================================================
 * This file is responsible for:
 * 1. Creating the Express application
 * 2. Registering global middlewares
 * 3. Registering all application routes
 * 4. Handling global errors
 * ==========================================================
 */

// ==========================================================
// Import Core Packages
// ==========================================================
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// ==========================================================
// Import Route Files
// ==========================================================
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const searchRoutes =
require("./routes/searchRoutes");

const reportRoutes =
require("./routes/reportRoutes");

// ==========================================================
// Import Custom Middlewares
// ==========================================================
const errorHandler = require("./middleware/errorHandler");

// ==========================================================
// Create Express Application
// ==========================================================
const app = express();

// ==========================================================
// Global Middlewares
// ==========================================================

// Adds security-related HTTP headers
app.use(helmet());

// Enables Cross-Origin Resource Sharing (CORS)
// app.use(cors());

// Logs every incoming HTTP request
app.use(morgan("dev"));

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin:true,
    // origin(origin, callback) {

    //   if (!origin)
    //     return callback(null, true);

    //   if (allowedOrigins.includes(origin))
    //     return callback(null, true);

    //   callback(new Error("CORS Not Allowed"));

    // },
    credentials: true,
  })
);

// Parses incoming JSON data
app.use(express.json());

// Parses URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Parses cookies from incoming requests
app.use(cookieParser());

// ==========================================================
// API Routes
// ==========================================================

// Authentication Routes
app.use("/api/auth", authRoutes);

// OTP Routes
app.use("/api/auth", otpRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/webhooks",webhookRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/reports", reportRoutes);
// ==========================================================
// Health Check Route
// ==========================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 ShopNova AI Backend is running successfully.",
    status: "Server is Healthy",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================================
// Global Error Handler
// Must always be the last middleware
// ==========================================================
app.use(errorHandler);

// ==========================================================
// Export Express Application
// ==========================================================
module.exports = app;