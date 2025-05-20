const AppError = require("../../exceptions/app-error");
const DoctorRepository = require("../doctors/doctor.repository");
const ScheduleRepository = require("./schedule.repository");

const createSchedule = async (data) => {
  try {
    const doctor = await DoctorRepository.findOne(data.doctor_id);
    if(!doctor) throw new AppError("Error", 404, "Doctor not found");

    return (await ScheduleRepository.create(data));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSchedule
}
