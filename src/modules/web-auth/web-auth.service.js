const jwt = require('jsonwebtoken');
const { JWTCONFIG } = require('../../config/jwt.config');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWTCONFIG.access_token_key, {
    expiresIn: JWTCONFIG.access_token_ttl,
    algorithm: JWTCONFIG.algorithms,
  });
}

const verifyToken = (token) => {
  try {
    jwt.verify(
      token, 
      JWTCONFIG.access_token_key,
      {
        algorithms: JWTCONFIG.algorithms,
      } 
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  generateAccessToken,
  verifyToken,
}
