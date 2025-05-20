const AppError = require("../exceptions/app-error");

function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    if (err.statusCode === 422) {
      return res.status(422).json({
        message: 'Validation Error',
        errors: err.details,
      });
    }

    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.details,
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json(
    process.env.NODE_ENV === 'production'
      ? { message: 'Unknown error' }
      : { message: err.message, error: err }
  );
}

module.exports = errorHandler;
