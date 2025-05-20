const { z } = require('zod');

const singlePositiveNumberSchema = z
  .any()
  .refine((val) => val !== undefined && val !== null, { message: "Required" })
  .refine((val) => !isNaN(val), { message: "Must be a number" })

const dateSchema = z
  .string()
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Date must be in format YYYY-MM-DD",
  })
  .refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date value",
  });

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: "Time must be in format HH:mm (24-hour)",
  });

const createScheduleSchema = z.object({
  doctor_id: singlePositiveNumberSchema,
  day: z.string()
    .toLowerCase()
    .trim()
    .refine(
      (val) => ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"].includes(val), 
      { message: "Invalid day" }
    ),
  time_start: timeSchema,
  time_finish: timeSchema,
  quota: z.number(),
  status: z.boolean(),
  date: dateSchema,
}).refine((data) => data.time_start < data.time_finish, {
    message: "Start time must be before finish time",
    path: ["time_finish"],
  })

const getScheduleByDoctorIdSchema = z.object({
  doctor_id: singlePositiveNumberSchema,
  start_date: dateSchema,
  end_date: dateSchema,
}).refine((data) => data.start_date <= data.end_date, {
    message: "start_date must be before or equal to end_date",
    path: ["end_date"], // highlights error on end_date field
  });

module.exports = {
  createScheduleSchema,
  getScheduleByDoctorIdSchema,
}
