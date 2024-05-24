import * as z from "zod";

export const EventSchema = z.object({
  title: z.string().min(1, {
    message: "Title is requierd",
  }),
  description: z.string().optional(),
  type: z.string().refine((type) => type.trim().length > 0, {
    message: "Type cannot be empty",
  }),
  date: z.date(),
  time: z.date(),
  location: z.string().optional(),
});