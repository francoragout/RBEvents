"use server";

import { db } from "@/lib/db";
import { GuestSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as XLSX from "xlsx";
import * as fs from "fs";
import { X } from "lucide-react";

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

export const UpdateGuest = async (
  id: string,
  guestId: string,
  values: z.infer<typeof GuestSchema>
) => {
  const validatedFields = GuestSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update guest.",
    };
  }

  const { first_name, last_name, guest_type, table_number, observation } =
    validatedFields.data;

  try {
    await db.guest.update({
      where: { id },
      data: {
        first_name,
        last_name,
        guest_type,
        table_number,
        observation,
      },
    });
    revalidatePath(`/admin/events/${guestId}/guests`);
    return {
      success: true,
      message: "Guest was updated successfully!",
    };
  } catch (error) {
    console.error("Error updating guest:", error);
    return {
      success: false,
      message: "Failed to update guest!",
    };
  }
};

export const DeleteGuest = async (guestId: string) => {
  try {
    await db.guest.delete({ where: { id: guestId } });
    revalidatePath(`/admin/events/${guestId}/guests`);
    return {
      success: true,
      message: "Guest was deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting guest:", error);
    return {
      success: false,
      message: "Failed to delete guest!",
    };
  }
};
