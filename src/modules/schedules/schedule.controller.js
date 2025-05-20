const { validateSchema } = require("../../helpers/schema.validator");
const { createScheduleSchema, getScheduleByDoctorIdSchema } = require("./schedule.validation");
const scheduleService = require("./schedule.service");

const createSchedule = async (req, res) => {
  const dataValidated = validateSchema(createScheduleSchema, req.body);
  const createSchedule = await scheduleService.createSchedule(dataValidated);

  return res.status(201).json({
    message: "Success",
    data: createSchedule,
  });
}

const getScheduleByDoctorId = async (req, res) => {
  const dataValidated = validateSchema(getScheduleByDoctorIdSchema, req.params);
  const getScheduleByDoctorId = await scheduleService.getScheduleByDoctorId(dataValidated.doctor_id);

  return res.status(200).json({
    message: "Success",
    data: getScheduleByDoctorId,
  });
}

module.exports = {
  createSchedule,
  getScheduleByDoctorId,
}
