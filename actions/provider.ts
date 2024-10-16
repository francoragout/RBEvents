"use server";

import { db } from "@/lib/db";
import { ProviderSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateProvider = async (
  values: z.infer<typeof ProviderSchema>
) => {
  const validatedFields = ProviderSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create provider.",
    };
  }

  const {
    name,
    address,
    city,
    phone,
    rent,
    banquet,
    party,
    capacity,
    features,
  } = validatedFields.data;

  try {
    await db.provider.create({
      data: {
        name,
        address,
        city,
        phone,
        rent,
        banquet,
        party,
        capacity,
        features,
      },
    });
    revalidatePath("/admin/providers");
    return {
      success: true,
      message: "El salón fue creado exitosamente.",
    };
  } catch (error) {
    console.error("Error creating provider:", error);
    return {
      success: false,
      message: "Error al crear el salón.",
    };
  }
};

export const UpdateProvider = async (
  id: string,
  values: z.infer<typeof ProviderSchema>
) => {
  const validatedFields = ProviderSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update provider.",
    };
  }

  const {
    name,
    address,
    city,
    phone,
    capacity,
    rent,
    banquet,
    party,
    features,
  } = validatedFields.data;

  try {
    await db.provider.update({
      where: { id },
      data: {
        name,
        address,
        city,
        phone,
        capacity,
        rent,
        banquet,
        party,
        features,
      },
    });
    revalidatePath("/admin/providers");
    return {
      success: true,
      message: "El salón fue editado exitosamente.",
    };
  } catch (error) {
    console.error("Error updating provider:", error);
    return {
      success: false,
      message: "Error al editar el salón.",
    };
  }
};

export const DeleteProvider = async (id: string) => {
  try {
    await db.provider.delete({
      where: { id },
    });
    revalidatePath("/admin/providers");
    return {
      success: true,
      message: "El salón fue eliminado exitosamente.",
    };
  } catch (error) {
    console.error("Error deleting provider:", error);
    return {
      success: false,
      message: "Error al eliminar el salón.",
    };
  }
};

export const getProviders = async () => {
  try {
    const providers = await db.provider.findMany();
    return providers;
  } catch (error) {
    console.error("Error getting providers:", error);
    return [];
  }
};
