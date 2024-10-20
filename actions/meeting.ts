"use server";

import { db } from "@/lib/db";
import { MeetingSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateMeeting = async (values: z.infer<typeof MeetingSchema>) => {
  const validatedFields = MeetingSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create meeting.",
    };
  }

  const { note, date, time } = validatedFields.data;

  try {
    await db.meeting.create({
      data: {
        note,
        date,
        time,
      },
    });

    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: "Reunión creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating meeting:", error);
    return {
      success: false,
      message: "Error al crear la reunión",
    };
  }
};

export const DeleteMeeting = async (id: string) => {
  try {
    await db.meeting.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: "Reunión eliminada",
    };
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return {
      success: false,
      message: "Error al eliminar la reunión",
    };
  }
};
