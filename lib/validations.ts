import { array, z } from "zod";

const TaskSchema = z.object({
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

const BudgetSchema = z.object({
  id: z.string().optional(),
  category: z
    .string({ required_error: "Category is required" })
    .trim()
    .min(3, "Category must be at least 3 characters.")
    .max(30, "Category must not be longer than 30 characters."),
  name: z.string().optional(),
  description: z.string().optional(),
  paid_method: z.string().optional(),
  total_price: z.coerce.number().nonnegative().optional(),
  amount_paid: z.coerce.number().nonnegative().optional(),
  observation: z.string().optional(),
  eventId: z.string().optional(),
});

// Define el esquema de la ciudad
const CityEnum = z.enum([
  "SAN_MIGUEL_DE_TUCUMAN",
  "TAFI_VIEJO",
  "YERBA_BUENA",
  "LULES",
  "TAFI_DEL_VALLE",
]);

// Define el esquema del proveedor
const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  address: z.string().optional(),
  city: CityEnum,
  phone: z.string().optional(),
  features: z.array(z.string()).optional(),
  capacity: z.coerce.number().nonnegative().optional(),
  rent: z.coerce.number().nonnegative().optional(),
  dinner: z.coerce.number().nonnegative().optional(),
  lunch: z.coerce.number().nonnegative().optional(),
  after: z.coerce.number().nonnegative().optional(),
});

const GuestTypeEnum = z.enum([
  "AT_THE_BEGINNING",
  "AFTERWARDS",
  "TO_BE_CONFIRMED",
]);

const GuestSchema = z.object({
  id: z.string().optional(),
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .trim()
    .min(1, "First name must be at least 1 character."),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .trim()
    .min(1, "Last name must be at least 1 character."),
  guest_type: GuestTypeEnum,
  observation: z.string().optional(),
  table_number: z.coerce.number().nonnegative().nullish(),
  eventId: z.string().optional(),
});

const InformationSchema = z.object({
  id: z.string().optional(),
  full_name: z
    .string({
      required_error: "Full name is required",
    })
    .trim()
    .min(1, "Full name must be at least 1 character."),
  children: z.string().optional(),
  father: z.string().optional(),
  mother: z.string().optional(),
  brothers: z.string().optional(),
  godparents: z.string().optional(),
  witnesses: z.string().optional(),
  nutrition: z.string().optional(),
  allergies: z.string().optional(),
  drinks: z.string().optional(),
  eventId: z.string().optional(),
});

const NotificationSchema = z.object({
  id: z.string().optional(),
  message: z.string(),
  read: z.boolean(),
  link: z.string(),
  createdAt: z.date(),
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

const EventOrganizationEnum = z.enum([
  "COORDINATION",
  "PARTIAL",
  "COMPREHENSIVE",
]);

const EventSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must not be longer than 30 characters."),
  date: z.date({ required_error: "Please select date" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please select time"),
  type: EventTypeEnum,
  organization: EventOrganizationEnum,
  archived: z.boolean().default(false),
  providerId: z.string().nullish(),
  provider: ProviderSchema.nullish(),
  task: z.array(TaskSchema).optional(),
  budget: z.array(BudgetSchema).optional(),
  guest: z.array(GuestSchema).optional(),
  information: array(InformationSchema).optional(),
  userEmail: z.string().email().nullish(),
});

const MeetingSchema = z.object({
  id: z.string().optional(),
  note: z
    .string({ required_error: "Note is required" })
    .trim()
    .min(1, "Note must be at least 1 character."),
  date: z.date({ required_error: "Please select date" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please select time"),
  reminder: z.boolean().default(false),
});

const RoleEnum = z.enum(["USER", "ADMIN"]);
const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  image: z.string().nullable(),
  role: RoleEnum,
  createdAt: z.date().default(() => new Date()),
  events: z.array(EventSchema).optional(),
});

export {
  UserSchema,
  MeetingSchema,
  GuestSchema,
  ProviderSchema,
  EventSchema,
  TaskSchema,
  BudgetSchema,
  InformationSchema,
  NotificationSchema,
};
