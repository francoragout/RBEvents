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
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
    return {
      success: true,
      message: `"${name}" was created successfully!`,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Failed to create task!",
    };
  }
};
