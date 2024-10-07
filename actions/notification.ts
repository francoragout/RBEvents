"use server";

import { db } from "@/lib/db";
import { auth } from "../auth"

export const GetNotifications = async () => {
  const session = await auth()
  console.log(session)
  try {
    

    return {
      success: true,
      
    };
  } catch (error) {
    return {
      success: false,
    };
  }

}

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
