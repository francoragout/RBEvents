"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";

export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
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
  } catch (error) {
    return {
      message: `"Failed to create event."`,
    };
  }

  revalidatePath("/admin/events");
  redirect(`/admin/events`);
};
