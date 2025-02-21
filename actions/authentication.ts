"use server";

import { db } from "@/lib/db";

export const MagicLinks = async (email: string) => {
  try {
    // Check if the user is an admin
    const admin = await db.user.findFirst({
      where: { email, role: 'ADMIN' },
    });

    if (admin) {
      return {
        success: true,
        message: "Correo de verificación enviado",
      };
    }

    // Check if the user has events
    const userEvents = await db.event.findFirst({
      where: { email },
    });

    if (!userEvents) {
      return {
        success: false,
        message: "Solo los usuarios con eventos pueden iniciar sesión",
      };
    }

    return {
      success: true,
      message: "Correo de verificación enviado",
    };
  } catch (error) {
    console.log("Error sending magic link:", error);
    return {
      success: false,
      message: "Error al iniciar sesión",
    };
  }
};