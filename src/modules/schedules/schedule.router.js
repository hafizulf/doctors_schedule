const express = require('express');
const router = express.Router();

const scheduleController = require('./schedule.controller');

router.post('/', scheduleController.createSchedule);

module.exports = router;
