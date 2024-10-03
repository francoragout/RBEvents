"use server";

import { db } from "@/lib/db";
import { NotificationSchema } from "@/lib/validations";
import { z } from "zod";

export const CreateNotification = async (
  values: z.infer<typeof NotificationSchema>
) => {
  const validatedFields = NotificationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create notification.",
    };
  }

  const { title, description, date, time } = validatedFields.data;

  try {
    const notification = await db.notification.create({
      data: {
        title,
        description,
        date,
        time,
      },
    });

    return {
      success: true,
      notification,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const MarkNotificationsAsRead = async () => {
  try {
    const notifications = await db.notification.updateMany({
      where: {
        read: false,
      },
      data: {
        read: true,
      },
    });

    return {
      success: true,
      notifications,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
