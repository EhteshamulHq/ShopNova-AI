/**
 * ==========================================================
 *                  SERVER ENTRY POINT
 * ==========================================================
 * This file is responsible for:
 * 1. Loading environment variables
 * 2. Connecting to MongoDB
 * 3. Starting the Express server
 * ==========================================================
 */

// ----------------------------------------------------------
// Load Environment Variables
// ----------------------------------------------------------
require("dotenv").config();

// ----------------------------------------------------------
// Import Express Application
// ----------------------------------------------------------
const app = require("./app");

// ----------------------------------------------------------
// Import Database Connection Function
// ----------------------------------------------------------
const connectDatabase = require("./config/database");

// ----------------------------------------------------------
// Connect to MongoDB Database
// ----------------------------------------------------------
connectDatabase();

// ----------------------------------------------------------
// Define Server Port
// If PORT is available in .env, use it.
// Otherwise, use 5000 as the default.
// ----------------------------------------------------------
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------------
// Start Express Server
// ----------------------------------------------------------
app.listen(PORT, () => {
  console.log("=======================================");
  console.log("🚀 ShopNova Backend Server Started");
  console.log(`🌐 Server URL : http://localhost:${PORT}`);
  console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
  console.log("=======================================");
});