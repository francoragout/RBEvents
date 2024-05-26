import * as z from "zod";

export const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  time: z.string().time(),
  date: z.string().date(),
  location: z.string().optional(),
  type: z.string()
});

