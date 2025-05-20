const { validateSchema } = require("../../helpers/schema.validator");
const { createScheduleSchema } = require("./schedule.validation");
const scheduleService = require("./schedule.service");

const createSchedule = async (req, res, next) => {
  const dataValidated = validateSchema(createScheduleSchema, req.body);

  const createSchedule = await scheduleService.createSchedule(dataValidated);

  return res.status(201).json({
    message: "Success",
    data: createSchedule,
  });
}

module.exports = {
  createSchedule
}
