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

  const { note, date, time, reminder } = validatedFields.data;

  try {
    await db.meeting.create({
      data: {
        note,
        date,
        time,
        reminder,
      },
    });
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: "Meeting was created successfully!",
    };
  } catch (error) {
    console.error("Error creating meeting:", error);
    return {
      success: false,
      message: "Failed to create meeting!",
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
      message: "Meeting was deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return {
      success: false,
      message: "Failed to delete meeting!",
    };
  }
};
