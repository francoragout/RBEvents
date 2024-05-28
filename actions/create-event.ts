import { db } from "@/lib/db";
import { error } from "console";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(20, {
      message: "Title must not be longer than 20 characters.",
    }),
  type: z.string({
    required_error: "Please select the type of event to display.",
  }),
  date: z.date({
    required_error: "Required.",
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Time must be in the format HH:MM.",
  }),
  lounge: z
    .string()
    .max(30, {
      message: "Lounge must not be longer than 30 characters.",
    })
    .optional(),
  description: z
    .string()
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    })
    .optional(),
});

export const CreateEvent = async (values: z.infer<typeof formSchema>) => {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Event created" };
};
