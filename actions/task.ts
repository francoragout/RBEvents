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
      message: "Task was created successfully!",
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Failed to create task!",
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
      message: "Task was updated successfully!",
    };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      success: false,
      message: "Failed to update task!",
    };
  }
};

export const DeleteTask = async (eventId: string) => {
  try {
    await db.task.delete({ where: { id: eventId } });
    revalidatePath(`/admin/events/${eventId}/tasks`);
    return {
      success: true,
      message: "Task was deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      success: false,
      message: "Failed to delete task!",
    };
  }
};
