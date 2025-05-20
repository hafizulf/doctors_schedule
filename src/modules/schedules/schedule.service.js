const { status_code } = require("../../constants/status-code.constant");
const AppError = require("../../exceptions/app-error");
const DoctorRepository = require("../doctors/doctor.repository");
const ScheduleRepository = require("./schedule.repository");

const createSchedule = async (data) => {
  const doctor = await DoctorRepository.findOne(data.doctor_id);
  if(!doctor) throw new AppError("Error", status_code.NOT_FOUND, "Doctor not found");

  const result = await ScheduleRepository.createDoctorSchedulesByRange(data);
  const formattedResult = result.map((item) => responseFormat(item.toJSON()));

  return formattedResult;
}

const getScheduleByDoctorId = async (doctor_id) => {
  const doctor = await DoctorRepository.findOne(doctor_id);
  if(!doctor) throw new AppError("Error", status_code.NOT_FOUND, "Doctor not found");

  const result = await ScheduleRepository.findDoctorScheduleByDateRange(doctor_id);
  const formattedResult = result.map((item) => responseFormat(item.toJSON(), true));

  return formattedResult;
}

const responseFormat = (data, methodGet = false) => {
  const row = {
    id: data.id,
    doctor_id: data.doctor_id,
    day: data.day,
    time_start: data.time_start?.slice(0, 5),
    time_finish: data.time_finish?.slice(0, 5),
    quota: data.quota,
    status: data.status,
    date: data.date?.toISOString().slice(0, 10),
  };

  if(methodGet) row.doctor_name = data.doctor.name;
  return row;
}

module.exports = {
  createSchedule,
  getScheduleByDoctorId,
}
