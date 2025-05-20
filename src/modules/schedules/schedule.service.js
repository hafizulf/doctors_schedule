const AppError = require("../../exceptions/app-error");
const DoctorRepository = require("../doctors/doctor.repository");
const ScheduleRepository = require("./schedule.repository");

const createSchedule = async (data) => {
  const doctor = await DoctorRepository.findOne(data.doctor_id);
  if(!doctor) throw new AppError("Error", 404, "Doctor not found");

  return (await ScheduleRepository.create(data));
}

const getScheduleByDoctorId = async (doctor_id, date_range) => {
  const doctor = await DoctorRepository.findOne(doctor_id);
  if(!doctor) throw new AppError("Error", 404, "Doctor not found");

  const result = await ScheduleRepository.findDoctorScheduleByDateRange(doctor_id, date_range);
  const formattedResult = result.map((item) => {
    const obj = item.toJSON();

    return {
      id: obj.id,
      doctor_id: obj.doctor_id,
      day: obj.day,
      time_start: obj.time_start?.slice(0, 5),
      time_finish: obj.time_finish?.slice(0, 5),
      quota: obj.quota,
      status: obj.status,
      date: obj.date?.toISOString().slice(0, 10),
    };
  });

  return formattedResult;
}

module.exports = {
  createSchedule,
  getScheduleByDoctorId,
}
