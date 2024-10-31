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

  const { name, type, date, time, providerId, organization, email } =
    validatedFields.data;

  try {
    const event = await db.event.create({
      data: {
        name,
        type,
        date,
        time,
        organization,
        providerId,
        email,
      },
      select: {
        id: true,
      },
    });

    if (email) {
      const user = await db.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        await db.event.update({
          where: {
            id: event.id,
          },
          data: {
            userId: user.id,
          },
        });
      }
    }

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
          category: "Salón",
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
      message: "Evento creado exitosamente",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el evento.",
    };
  }
};

export const UpdateEvent = async (
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

  const { name, type, date, time, providerId, organization, email } =
    validatedFields.data;

  let userId: string | null = null;

  try {
    await db.event.update({
      where: { id },
      data: {
        name,
        type,
        date,
        time,
        email,
        organization,
        providerId,
        userId: userId,
      },
    });

    if (email) {
      const user = await db.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        await db.event.update({
          where: {
            id,
          },
          data: {
            userId: user.id,
          },
        });
      }
    }
    
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Evento actualizado",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizazr el evento",
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
      message: "Evento eliminado",
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      message: "Error al eliminar el evento",
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
      message: "Evento archivado",
    };
  } catch (error) {
    console.error("Error archiving event:", error);
    return {
      success: false,
      message: "Error al archivar el evento",
    };
  }
};

export const UnarchiveEvent = async (id: string) => {
  try {
    await db.event.update({
      where: { id },
      data: {
        archived: false,
      },
    });
    revalidatePath("/admin/events/archived");
    return {
      success: true,
      message: "Evento desarchivado",
    };
  } catch (error) {
    console.error("Error unarchiving event:", error);
    return {
      success: false,
      message: "Error al desarchivar el evento",
    };
  }
};

export const DeleteProviderFromEvent = async (eventId: string) => {
  try {
    await db.event.update({
      where: { id: eventId },
      data: {
        providerId: null,
      },
    });
    revalidatePath(`/admin/events/${eventId}/edit`);
    return {
      success: true,
      message: "Proveedor eliminado",
    };
  } catch (error) {
    console.error("Error deleting provider from event:", error);
    return {
      success: false,
      message: "Error al eliminar el proveedor del evento",
    };
  }
}

