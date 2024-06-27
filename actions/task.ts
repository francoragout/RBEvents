import { db } from "@/lib/db";
import { taskSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateTask = async (
  values: z.infer<typeof taskSchema>
) => {
  const validatedFields = taskSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create task.",
    };
  }

  const { title, label, status, priority, eventId } = validatedFields.data;

  try {
    const newTask = await db.task.create({
      data: {
        title,
        label,
        status,
        priority,
        eventId,
      },
    });
    revalidatePath("/admin/events");
    return {
      success: true,
      message: `"${title}" was created successfully!`,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Failed to create task!",
    };
  }
};

