/**
 * ===========================================================
 * Secure OTP Generator
 * ===========================================================
 * Generates a cryptographically secure 6-digit OTP.
 * Compatible with Node.js CommonJS
 * ===========================================================
 */

const crypto = require("node:crypto");

/**
 * Generate a secure 6-digit OTP
 *
 * @returns {string}
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

module.exports = generateOTP;