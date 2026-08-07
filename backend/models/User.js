/**
 * ===========================================================
 * User Model
 * ===========================================================
 * Purpose:
 * Defines the structure of user documents in MongoDB.
 *
 * Why?
 * - Ensures all users have a consistent data structure.
 * - Enables validation.
 * - Supports authentication and authorization.
 * ===========================================================
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * ===========================================================
 * User Schema
 * ===========================================================
 */
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // User email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Encrypted password
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Hide password by default
    },

    // User role
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    // Email verification status
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Reset Password Token
resetPasswordToken: {
  type: String,
},

// Reset Password Expiry
resetPasswordExpire: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

/**
 * ===========================================================
 * Middleware
 * Hash password before saving
 * Compatible with Mongoose 8 & 9
 * ===========================================================
 */
userSchema.pre("save", async function () {
  // Skip if password is unchanged
  if (!this.isModified("password")) {
    return;
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * ===========================================================
 * Compare entered password with hashed password
 * ===========================================================
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * ===========================================================
 * Export User Model
 * ===========================================================
 */
module.exports = mongoose.model("User", userSchema);