const express = require('express');
const router = express.Router();

const scheduleController = require('./schedule.controller');

router.post('/', scheduleController.createSchedule);
router.get('/:doctor_id', scheduleController.getScheduleByDoctorId);

module.exports = router;
