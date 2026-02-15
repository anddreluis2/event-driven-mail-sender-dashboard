import { z } from "zod";

export const scheduleEmailSchema = z.object({
  toEmail: z.email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  sendAt: z.iso.datetime("Invalid date/time"),
});

export type ScheduleEmailInput = z.infer<typeof scheduleEmailSchema>;
