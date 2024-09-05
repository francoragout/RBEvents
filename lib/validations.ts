import { User } from "lucide-react";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(30, "Name must be less than 30 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const CityEnum = z.enum([
  "SAN_MIGUEL_DE_TUCUMAN",
  "TAFI_VIEJO",
  "YERBA_BUENA",
  "LULES",
  "TAFI_DEL_VALLE",
]);

export const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  address: z.string().optional(),
  city: CityEnum,
  phone: z.string().nullish(),
  features: z
    .array(z.string()),
  capacity: z.coerce.number().nonnegative().optional(),
  rent: z.coerce.number().nonnegative().optional(),
  dinner: z.coerce.number().nonnegative().optional(),
  lunch: z.coerce.number().nonnegative().optional(),
  after: z.coerce.number().nonnegative().optional(),
});

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(6, "Name must be at least 6 characters.")
    .max(100, "Name must not be longer than 100 characters."),
  status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "DONE"]),
  label: z.enum(["ANA", "BELEN"]).optional().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().nullable(),
  eventId: z.string().optional(),
});

export const BudgetSchema = z.object({
  id: z.string().optional(),
  category: z
    .string({ required_error: "Category is required" })
    .trim()
    .min(3, "Category must be at least 3 characters.")
    .max(30, "Category must not be longer than 30 characters."),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  description: z.string().optional(),
  paid_method: z.string().optional(),
  amount: z.number().int().optional(),
  amount_paid: z.number().int().optional(),
  observation: z.string().optional(),
  eventId: z.string().optional(),
});

const EventTypeEnum = z.enum([
  "WEDDING",
  "BIRTHDAY",
  "OPENING",
  "ANNIVERSARY",
  "PARTY",
  "PARADE",
  "CONGRESS",
  "PRODUCT_LAUNCH",
  "OTHER",
]);

export const EventSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  type: EventTypeEnum,
  date: z.date({ required_error: "Please select date" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please select time"),
  organization: z.enum(["COORDINATION", "PARTIAL", "COMPREHENSIVE"], {
    required_error: "Please select organization",
  }),
  archived: z.boolean().default(false),
  task: z.array(TaskSchema).default([]),
  budget: z.array(BudgetSchema).default([]),
  providerId: z.string().nullish(),
  provider: ProviderSchema.nullish(),
  userEmail: z.string().email().nullish(),
});
