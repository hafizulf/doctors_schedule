const webAuthService = require("./web-auth.service");
const { status_code } = require("../../constants/status-code.constant");

const generateAccessToken = (req, res) => {
  const token = webAuthService.generateAccessToken(req.body);

  return res.status(status_code.OK).json({
    message: "Success",
    data: {
      access_token: token,
    },
  });
}

module.exports = {
  generateAccessToken,
}
