const { DatabaseError, UniqueConstraintError } = require("sequelize");
const AppError = require("../exceptions/app-error");

function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.details ?? null,
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      message: "Unique constraint violation",
      errors: err.errors.map((e) => e.message),
    });
  }

  if (err instanceof DatabaseError) {
    const code = err.parent?.code;
    const message = err.message;

    // Optional: handle specific PG error codes like 22P02 (invalid input syntax)
    if (code === "22P02") {
      return res.status(400).json({
        message: "Invalid input: expected correct data type",
        errors: message,
      });
    }

    return res.status(400).json({
      message: "Database error",
      errors: message,
    });
  }

  // Fallback error
  console.error("Unhandled Error:", err);
  return res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Unknown error" : err.message,
    error: process.env.NODE_ENV === "production" ? undefined : err,
  });
}

module.exports = errorHandler;
