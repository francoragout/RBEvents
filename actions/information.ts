"use server";

import { db } from "@/lib/db";
import { InformationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateInformation = async (
  eventId: string,
  values: z.infer<typeof InformationSchema>
) => {
  const validatedFields = InformationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create information.",
    };
  }

  const {
    full_name,
    mother,
    father,
    brothers,
    children,
    godparents,
    witnesses,
    nutrition,
    allergies,
    drinks,
  } = validatedFields.data;

  try {
    await db.information.create({
      data: {
        full_name,
        mother,
        father,
        brothers,
        children,
        godparents,
        witnesses,
        nutrition,
        allergies,
        drinks,
        eventId,
      },
    });

    const eventName = await db.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        name: true,
      },
    });

    await db.notification.create({
      data: {
        message: `Nueva información: '${eventName?.name}'`,
        link: `/admin/events/${eventId}/information`,
        read: false,
      },
    });

    revalidatePath(`/admin/events/${eventId}/information`);
    return {
      success: true,
      message: "La información fue creada exitosamente.",
    };
  } catch (error) {
    console.error("Error creating information:", error);
    return {
      success: false,
      message: "Error al crear la información.",
    };
  }
};

export const UpdateInformation = async (
  id: string,
  eventId: string,
  values: z.infer<typeof InformationSchema>
) => {
  const validatedFields = InformationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update information.",
    };
  }

  const {
    full_name,
    mother,
    father,
    brothers,
    children,
    godparents,
    witnesses,
    nutrition,
    allergies,
    drinks,
  } = validatedFields.data;

  try {
    await db.information.update({
      where: {
        id,
      },
      data: {
        full_name,
        mother,
        father,
        brothers,
        children,
        godparents,
        witnesses,
        nutrition,
        allergies,
        drinks,
      },
    });
    revalidatePath(`/admin/events/${values.eventId}/information`);
    return {
      success: true,
      message: "La información fue editada exitosamente.",
    };
  } catch (error) {
    console.error("Error updating information:", error);
    return {
      success: false,
      message: "Error al editar la información.",
    };
  }
};

export const DeleteInformation = async (eventId: string) => {
  try {
    await db.information.delete({
      where: {
        id: eventId,
      },
    });
    revalidatePath(`/admin/events/${eventId}/information`);
    return {
      success: true,
      message: "La información fue eliminada exitosamente.",
    };
  } catch (error) {
    console.error("Error deleting information:", error);
    return {
      success: false,
      message: "Error al eliminar la información.",
    };
  }
};
