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
        message: "Email not found",
      };
    }

    userId = user.id;
  }

  try {
    await db.event.create({
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
          event : true
          
        },
      });

      
    }

    

    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Event created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create event.",
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
        message: "Email not found",
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
    revalidatePath("/admin/events");
    return {
      success: true,
      message: "Event edited successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to edit event.",
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
      message: `Event was deleted successfully!`,
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      message: "Failed to delete event!",
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
      message: `Event was archived successfully!`,
    };
  } catch (error) {
    console.error("Error archiving event:", error);
    return {
      success: false,
      message: "Failed to archive event!",
    };
  }
};
