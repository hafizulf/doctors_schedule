const dayjs = require("dayjs");
const { Doctor,Schedule, sequelize } = require("../../models");
const { DATE_TIME_FORMAT } = require("../../constants/date-format.constant");

const createDoctorSchedulesByRange = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      doctor_id,
      day,
      time_start,
      time_finish,
      quota,
      status,
      start_date,
      end_date,
    } = data;

    const start = dayjs(start_date);
    const end = dayjs(end_date);
    const schedules = [];

    for (let date = start; date.isBefore(end) || date.isSame(end); date = date.add(1, 'day')) {
      schedules.push({
        doctor_id,
        day,
        time_start,
        time_finish,
        quota,
        status,
        date: date.format(DATE_TIME_FORMAT.DATE),
      });
    }

    const insertedRows = await Schedule.bulkCreate(schedules, {
      returning: true, 
      transaction,
    });
    
    await transaction.commit();
    return insertedRows;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

const findDoctorScheduleByDateRange = async (doctor_id) => {
  const data = await Schedule.findAll({
    include: {
      model: Doctor,
      as: 'doctor',
      attributes: ['name'],
    },
    where: {
      doctor_id,
    }
  });

  return data;
}

module.exports = {
  createDoctorSchedulesByRange,
  findDoctorScheduleByDateRange,
}
