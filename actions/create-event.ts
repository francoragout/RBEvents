import { db } from "@/lib/db";
import { EventSchema } from "@/schemas";
import { z } from "zod";

export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
    const validatedFields = EventSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
      }
}