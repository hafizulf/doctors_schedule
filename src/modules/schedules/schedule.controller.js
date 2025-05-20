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
  const dataValidated = validateSchema(getScheduleByDoctorIdSchema, {
    ...req.params,
    ...req.body,
  });

  const getScheduleByDoctorId = await scheduleService.getScheduleByDoctorId(
    dataValidated.doctor_id,
    {
      start_date: dataValidated.start_date,
      end_date: dataValidated.end_date
    }
  );

  return res.status(200).json({
    message: "Success",
    data: getScheduleByDoctorId,
  });
}

module.exports = {
  createSchedule,
  getScheduleByDoctorId,
}
