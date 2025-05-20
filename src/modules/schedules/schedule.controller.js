const { validateSchema } = require("../../helpers/schema.validator");
const { createScheduleSchema, getScheduleByDoctorIdSchema } = require("./schedule.validation");
const scheduleService = require("./schedule.service");
const { status_code } = require("../../constants/status-code.constant");

const createSchedule = async (req, res) => {
  const dataValidated = validateSchema(createScheduleSchema, req.body);
  const createSchedule = await scheduleService.createSchedule(dataValidated);

  return res.status(status_code.CREATED).json({
    message: "Success",
    data: createSchedule,
  });
}

const getScheduleByDoctorId = async (req, res) => {
  const dataValidated = validateSchema(getScheduleByDoctorIdSchema, req.params);
  const getScheduleByDoctorId = await scheduleService.getScheduleByDoctorId(dataValidated.doctor_id);

  return res.status(status_code.OK).json({
    message: "Success",
    data: getScheduleByDoctorId,
  });
}

module.exports = {
  createSchedule,
  getScheduleByDoctorId,
}
