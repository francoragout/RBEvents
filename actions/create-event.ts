"use server";

import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name } = validatedFields.data;
  // const isoTime = new Date(`1970-01-01T${time}:00Z`).toISOString();

  await db.event.create({
    data: {
      name,
      // type,
      // date,
      // time: isoTime,
      // lounge,
      // description,
    },
  });
  revalidatePath("/admin/events");
  return { success: "Confirmation event created!" };
};
