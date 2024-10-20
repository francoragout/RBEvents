'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const DeleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "Usuario eliminado",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Error al eliminar el usuario",
    };
  }
};
