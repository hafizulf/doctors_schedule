const express = require('express');
const router = express.Router();

const webAuthController = require('./web-auth.controller');

router.post('/generate-access-token', webAuthController.generateAccessToken);

module.exports = router;