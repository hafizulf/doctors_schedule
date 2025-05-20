const AppError = require("../exceptions/app-error");

module.exports.validateSchema = (schema, data) => {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    const error = validationResult.error;

    throw fromZodError(error);
  }

  return validationResult.data;
}

const fromZodError = (error) => {
  const detailedErrors = error.errors.reduce(
    (acc, err) => {
      const path = err.path.join(".");
      const message = err.message;

      if (acc[path]) {
        acc[path].push(message);
      } else {
        acc[path] = [message];
      }

      return acc;
    },
    {}
  );

  const e = new AppError("Validation Error", 422, detailedErrors);
  throw e;
}
