/**
 * ===========================================================
 * Mail Configuration
 * ===========================================================
 * Creates and exports a reusable Nodemailer transporter.
 * ===========================================================
 */

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Verify SMTP Connection (Development Only)
 */
if (process.env.NODE_ENV !== "production") {
  transporter
    .verify()
    .then(() => {
      console.log("✅ Mail server connected");
    })
    .catch((err) => {
      console.error("❌ Mail server error:", err.message);
    });
}

module.exports = transporter;