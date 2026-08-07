/**
 * ===========================================================
 * JWT Token Utility
 * ===========================================================
 * Purpose:
 * Generate reusable JWT access tokens.
 *
 * Why?
 * - Avoid duplicate code
 * - Keep authentication logic reusable
 * - Follow Single Responsibility Principle (SOLID)
 * ===========================================================
 */

const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 *
 * @param {String} userId - MongoDB User ID
 * @returns {String} JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

module.exports = generateToken;