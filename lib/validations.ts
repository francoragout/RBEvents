import { z } from "zod";

export const EventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Title must not be longer than 20 characters.",
    }),
  type: z.enum(["WEDDING", "BIRTHDAY", "OPENING", "MEETING", "OTHER"], {
    message: "Please select type.",
  }),
  date: z.date({
    message: "Please select date.",
  }),
  time: z.string({
    message: "Please select time.",
  }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
});
