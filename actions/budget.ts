"use server";

import { db } from "@/lib/db";
import { BudgetSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateBudget = async (
  eventId: string,
  values: z.infer<typeof BudgetSchema>
) => {
  const validatedFields = BudgetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create budget.",
    };
  }

  const {
    category,
    name,
    description,
    paid_method,
    total_price,
    amount_paid,
    observation,
  } = validatedFields.data;

  try {
    await db.budget.create({
      data: {
        category,
        name,
        description,
        paid_method,
        total_price,
        amount_paid,
        observation,
        eventId,
      },
    });

    revalidatePath(`/admin/events/${eventId}/budget`);
    return {
      success: true,
      message: "Presupuesto creado exitosamente",
    };
  } catch (error) {
    console.error("Error creating budget:", error);
    return {
      success: false,
      message: "Error al crear el presupuesto",
    };
  }
};

export const UpdateBudget = async (
  budgetId: string,
  eventId: string,
  values: z.infer<typeof BudgetSchema>
) => {
  const validatedFields = BudgetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update budget.",
    };
  }

  const {
    category,
    name,
    description,
    paid_method,
    total_price,
    amount_paid,
    observation,
  } = validatedFields.data;

  try {
    await db.budget.update({
      where: { id: budgetId },
      data: {
        category,
        name,
        description,
        paid_method,
        total_price,
        amount_paid,
        observation,
      },
    });

    revalidatePath(`/admin/events/${eventId}/budget`);
    return {
      success: true,
      message: "Presupuesto actualiazdo",
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return {
      success: false,
      message: "Error al actuazliar el presupuesto",
    };
  }
};

export const DeleteBudget = async (budgetId: string, eventId: string) => {
  try {
    await db.budget.delete({ where: { id: budgetId } });

    revalidatePath(`/admin/events/${eventId}/budget`);
    return {
      success: true,
      message: "Presupuesto eliminado",
    };
  } catch (error) {
    console.error("Error deleting budget:", error);
    return {
      success: false,
      message: "Error al eliminar el presupuesto.",
    };
  }
};

export const DeleteBudgets = async (budgetIds: string[], eventId: string) => {
  try {
    await db.budget.deleteMany({
      where: {
        id: {
          in: budgetIds,
        },
      },
    });

    revalidatePath(`/admin/events/${eventId}/budget`);
    return {
      success: true,
      message: "Presupuestos eliminados",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al eliminar los presupuestos",
    };
  }
};
