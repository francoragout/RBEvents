import { z } from "zod";

export const TaskSchema = z.object({
  id: z
    .string()
    .optional(),
  title: z
    .string()
    .trim()
    .min(6, "Name must be at least 6 characters.")
    .max(100, "Name must not be longer than 100 characters."),
  status: z
    .enum(["BACKLOG", "TODO", "IN_PROGRESS", "DONE"])
    .optional()
    .nullable(),
  label: z
    .enum(["ANA", "BELU"])
    .optional()
    .nullable(),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional()
    .nullable(),
  eventId: z
    .string()
    .optional(),
});

export const EventSchema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  type: z.enum(["WEDDING", "BIRTHDAY", "OPENING", "MEETING", "OTHER"], {required_error: "Please select type"}),
  date: z
    .date({ required_error: "Please select date" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please select time"),
  venue: z
    .string()
    .optional()
    .nullable(),
  description: z
    .string()
    .optional()
    .nullable(),
  archived: z
    .boolean()
    .default(false),
  tasks: z
    .array(TaskSchema)
    .default([]),
});

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
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required")
    .max(30, "First name must be less than 30 characters"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required")
    .max(30, "Last name must be less than 30 characters"),
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
