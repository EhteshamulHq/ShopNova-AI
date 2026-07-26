// Import Mongoose
const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    // Stop server if database connection fails
    process.exit(1);
  }
};

// Export function
module.exports = connectDatabase;