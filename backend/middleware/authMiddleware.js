/**
 * ===========================================================
 * Authentication Middleware
 * ===========================================================
 * Purpose:
 * Protect private routes by verifying JWT tokens.
 *
 * Responsibilities:
 * - Read JWT from Authorization header
 * - Verify token
 * - Find authenticated user
 * - Attach user to req.user
 * ===========================================================
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * ===========================================================
 * Protect Routes Middleware
 * ===========================================================
 */
const protect = async (req, res, next) => {
  try {
    let token;

    /**
     * Authorization Header Format:
     * Bearer eyJhbGciOiJIUzI1NiIs...
     */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No Token Found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach User to Request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

/**
 * ===========================================================
 * Role Authorization Middleware
 * ===========================================================
 * Example:
 * authorize("admin")
 * authorize("admin", "manager")
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden.",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};