// Import Express framework
const express = require("express");

// Import security middleware
const helmet = require("helmet");

// Import CORS middleware
const cors = require("cors");

// Import request logger
const morgan = require("morgan");

// Import cookie parser
const cookieParser = require("cookie-parser");

// Create Express application
const app = express();

// Security headers
app.use(helmet());

// Allow cross-origin requests
app.use(cors());

// Log HTTP requests
app.use(morgan("dev"));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShopNova AI Backend is running successfully."
  });
});

// Export app
module.exports = app;