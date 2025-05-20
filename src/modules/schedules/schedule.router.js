const express = require('express');
const router = express.Router();

const scheduleController = require('./schedule.controller');
const { authenticate } = require('../../middlewares/auth.middleware');

router.post('/', authenticate, scheduleController.createSchedule);
router.get('/:doctor_id', authenticate, scheduleController.getScheduleByDoctorId);

module.exports = router;
