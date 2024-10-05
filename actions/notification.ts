"use server";

import { db } from "@/lib/db";

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
