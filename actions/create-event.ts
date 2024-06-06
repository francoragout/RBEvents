"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";

export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create event.",
    };
  }

  const { name } = validatedFields.data;

  try {
    await db.event.create({
      data: {
        name,
      },
    });
    revalidatePath("/admin/events");
    return {
      success: true,
      message: `"${name}" was created successfully!`,
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      message: "Failed to create event!",
    };
  }
};
