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
      message: "User was deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Failed to delete user!",
    };
  }
};
