'use server';

import { db } from "@/lib/db";
import { ProviderSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateProvider = async (values: z.infer<typeof ProviderSchema>)  => {
    const validatedFields = ProviderSchema.safeParse(values);
    
    if (!validatedFields.success) {
        return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create provider.",
        };
    }
    
    const { name, address, city, phone } = validatedFields.data;
    
    try {
        await db.provider.create({
        data: {
            name,
            address,
            city,
            phone,
        },
        });
        revalidatePath("/admin/providers");
        return {
        success: true,
        message: "Provider was created successfully!",
        };
    } catch (error) {
        console.error("Error creating provider:", error);
        return {
        success: false,
        message: "Failed to create provider!",
        };
    }
}