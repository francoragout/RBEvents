"use server";

import { db } from "@/lib/db";
import { GuestSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateGuest = async (
  eventId: string,
  values: z.infer<typeof GuestSchema>
) => {
  const validatedFields = GuestSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create guest.",
    };
  }

  const { first_name, last_name, guest_type, table_number, observation } =
    validatedFields.data;

  try {
    await db.guest.create({
      data: {
        first_name,
        last_name,
        guest_type,
        table_number,
        observation,
        event: { connect: { id: eventId } },
      },
    });
    revalidatePath(`/admin/events/${eventId}/guests`);
    return {
      success: true,
      message: "Guest was created successfully!",
    };
  } catch (error) {
    console.error("Error creating guest:", error);
    return {
      success: false,
      message: "Failed to create guest!",
    };
  }
};
