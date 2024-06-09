import { z } from "zod";

export const EventSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Title must not be longer than 20 characters.",
    })
    .trim(),
  type: z.string({
    message: "Please select a type.",
  }),
});
