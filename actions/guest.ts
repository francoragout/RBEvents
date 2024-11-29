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

  const { first_name, last_name, invitation, table_number, observation } =
    validatedFields.data;

  try {
    await db.guest.create({
      data: {
        first_name,
        last_name,
        invitation,
        table_number,
        observation,
        event: { connect: { id: eventId } },
      },
    });
    revalidatePath(`/admin/events/${eventId}/guests`);
    return {
      success: true,
      message: "Invitado creado exitosamente.",
    };
  } catch (error) {
    console.error("Error creating guest:", error);
    return {
      success: false,
      message: "Error al crear el invitado",
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

  const { first_name, last_name, invitation, table_number, observation } =
    validatedFields.data;

  try {
    await db.guest.update({
      where: { id },
      data: {
        first_name,
        last_name,
        invitation,
        table_number,
        observation,
      },
    });
    revalidatePath(`/admin/events/${guestId}/guests`);
    return {
      success: true,
      message: "Invitado actualizado",
    };
  } catch (error) {
    console.error("Error updating guest:", error);
    return {
      success: false,
      message: "Error al actualizar invitado",
    };
  }
};

export const DeleteGuest = async (guestId: string) => {
  try {
    await db.guest.delete({ where: { id: guestId } });
    revalidatePath(`/admin/events/${guestId}/guests`);
    return {
      success: true,
      message: "Invitado eliminado",
    };
  } catch (error) {
    console.error("Error deleting guest:", error);
    return {
      success: false,
      message: "Error al eliminar el invitado",
    };
  }
};

export const DeleteGuests = async (guestsIds: string[], eventId: string) => {
  try {
    await db.guest.deleteMany({
      where: {
        id: {
          in: guestsIds,
        },
      },
    });

    revalidatePath(`/admin/events/${eventId}/guests`);
    return {
      success: true,
      message: "Invitados eliminados",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "No se pudieron eliminar las invitados.",
    };
  }
};
