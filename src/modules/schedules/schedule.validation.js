const { z } = require('zod');

const singlePositiveNumberSchema = z
  .any()
  .refine((val) => val !== undefined && val !== null, { message: "Required" })
  .refine((val) => !isNaN(val), { message: "Must be a number" })

const createScheduleSchema = z.object({
  doctor_id: singlePositiveNumberSchema,
  day: z.string()
    .toLowerCase()
    .trim()
    .refine(
      (val) => ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"].includes(val), 
      { message: "Invalid day" }
    ),
  time_start: z.string(),
  time_finish: z.string(),
  quota: z.number(),
  status: z.boolean(),
  date: z.string(), // need to validate for date format
})

module.exports = {
  createScheduleSchema,
}
