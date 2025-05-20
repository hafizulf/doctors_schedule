const { Op } = require("sequelize");
const { Schedule } = require("../../models");

const create = async (data) => {
  return await Schedule.create(data);
}

const findDoctorScheduleByDateRange = async (doctor_id, date_range) => {
  const {  start_date, end_date } = date_range;
  const data = await Schedule.findAll({
    where: {
      doctor_id,
      date: {
        [Op.between]: [start_date, end_date]
      }
    }
  });

  console.log(data);
  return data;
}

module.exports = {
  create,
  findDoctorScheduleByDateRange,
}
