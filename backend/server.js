// Load environment variables
require("dotenv").config();

// Import Express app
const app = require("./app");

// Import database connection
const connectDatabase = require("./config/database");

// Connect MongoDB
connectDatabase();

// Read port from environment
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});