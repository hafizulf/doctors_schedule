const AppError = require("../exceptions/app-error");
const { status_code } = require("../constants/status-code.constant");
const webAuthService = require("../modules/web-auth/web-auth.service");

const authenticate = async (req, _res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new AppError('Forbidden', status_code.UNAUTHORIZED, 'Token is required');
  }

  const verified = webAuthService.verifyToken(token);
  if(!verified) {
    throw new AppError('Forbidden', status_code.UNAUTHORIZED, 'Token is invalid');
  }

  req.user = { username: "example" };

  return next();
};

module.exports = {
  authenticate,
};
