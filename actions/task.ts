"use server";

import { db } from "@/lib/db";
import { TaskSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateTask = async (
  eventId: string,
  values: z.infer<typeof TaskSchema>
) => {
  const validatedFields = TaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create task.",
    };
  }

  const { title, status, label, priority } = validatedFields.data;

  try {
    await db.task.create({
      data: {
        title,
        status,
        label,
        priority,
        event: { connect: { id: eventId } },
      },
    });
    revalidatePath(`/admin/events/${eventId}/tasks`);
    return {
      success: true,
      message: "Tarea creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Error al crear la tarea",
    };
  }
};

export const UpdateTask = async (
  id: string,
  eventId: string,
  values: z.infer<typeof TaskSchema>
) => {
  const validatedFields = TaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update task.",
    };
  }

  const { title, status, label, priority } = validatedFields.data;

  try {
    await db.task.update({
      where: { id },
      data: { title, status, label, priority },
    });
    revalidatePath(`/admin/events/${eventId}/tasks`);
    return {
      success: true,
      message: "Tarea actualizada",
    };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      success: false,
      message: "Error al actualizar tarea",
    };
  }
};

export const DeleteTask = async (eventId: string) => {
  try {
    await db.task.delete({ where: { id: eventId } });
    revalidatePath(`/admin/events/${eventId}/tasks`);
    return {
      success: true,
      message: "Tarea eliminada",
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      success: false,
      message: "Error al eliminar la tarea",
    };
  }
};

export const DeleteTasks = async (taskIds: string[], eventId: string) => {
  try {
    await db.task.deleteMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });

    revalidatePath(`/admin/events/${eventId}/tasks`);
    return {
      success: true,
      message: "Tareas eliminadas",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "No se pudieron eliminar las tareas.",
    };
  }
};
