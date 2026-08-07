/**
 * ===========================================================
 * Global Error Handler
 * ===========================================================
 */

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;

  let message =
    err.message || "Internal Server Error";

  /**
   * Mongoose Validation Error
   */

  if (err.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  /**
   * Duplicate Key Error
   */

  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(
      err.keyValue
    )[0];

    message = `${field} already exists.`;
  }

  /**
   * Invalid ObjectId
   */

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID.";
  }

  /**
   * JWT Errors
   */

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired.";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV ===
      "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;