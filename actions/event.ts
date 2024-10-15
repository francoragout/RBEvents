"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";
import { CreateBudget } from "./budget";

export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create event.",
    };
  }

  const { name, type, date, time, providerId, organization, userEmail } =
    validatedFields.data;

  let userId: string | null = null;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Email no encontrado",
      };
    }

    userId = user.id;
  }

  try {
    const event = await db.event.create({
      data: {
        name,
        type,
        date,
        time,
        organization,
        providerId,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    if (providerId) {
      const provider = await db.provider.findUnique({
        where: {
          id: providerId,
        },
        select: {
          name: true,
        },
      });

      if (provider) {
        await CreateBudget(event.id, {
          name: provider.name,
          category: "Provider",
          observation: "",
          description: "",
          paid_method: "",
          amount_paid: undefined,
          total_price: undefined,
        });
      }
    }

    await db.notification.create({
      data: {
        message: `Nuevo evento: '${name}'`,
        link: `/admin/events`,
        read: false,
      },
    });

    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Evento creado exitosamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el evento.",
    };
  }
};

export const EditEvent = async (
  id: string,
  values: z.infer<typeof EventSchema>
) => {
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit event.",
    };
  }

  const { name, type, date, time, providerId, organization, userEmail } =
    validatedFields.data;

  let userId: string | null = null;

  if (userEmail) {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Email no encontrado",
      };
    }

    userId = user.id;
  }

  try {
    await db.event.update({
      where: { id },
      data: {
        name,
        type,
        date,
        time,
        organization,
        providerId,
        userId: userId,
      },
    });

    if (providerId) {
      const provider = await db.provider.findUnique({
        where: {
          id: providerId,
        },
        select: {
          name: true,
        },
      });

      if (provider) {
        await CreateBudget(id, {
          name: provider.name,
          category: "Provider",
          observation: "",
          description: "",
          paid_method: "",
          amount_paid: undefined,
          total_price: undefined,
        });
      }
    }
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Evento editado exitosamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al editar el evento.",
    };
  }
};

export const DeleteEvent = async (id: string) => {
  try {
    await db.event.delete({
      where: { id },
    });
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Evento eliminado exitosamente.",
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      message: "Error al eliminar el evento.",
    };
  }
};

export const ArchiveEvent = async (id: string) => {
  try {
    await db.event.update({
      where: { id },
      data: {
        archived: true,
      },
    });
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Evento archivado exitosamente.",
    };
  } catch (error) {
    console.error("Error archiving event:", error);
    return {
      success: false,
      message: "Error al archivar el evento.",
    };
  }
};
