import { z } from "zod";

export const EventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(20, {
      message: "Title must not be longer than 20 characters.",
    }),
});
