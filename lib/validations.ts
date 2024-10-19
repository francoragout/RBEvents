import { array, z } from "zod";

const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(1, "El título debe tener al menos 1 caracter")
    .max(100, "El título no debe tener más de 100 caracteres"),
  status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "DONE"]),
  label: z.enum(["ANA", "BELEN"]).optional().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().nullable(),
  eventId: z.string().optional(),
});

const BudgetSchema = z.object({
  id: z.string().optional(),
  category: z
    .string()
    .trim()
    .min(1, "La categoría debe tener al menos 1 caracter")
    .max(30, "La categoría debe tener menos de 30 caracteres"),
  name: z.string().optional(),
  description: z.string().optional(),
  paid_method: z.string().optional(),
  total_price: z.coerce.number().nonnegative().optional(),
  amount_paid: z.coerce.number().nonnegative().optional(),
  observation: z.string().optional(),
  eventId: z.string().optional(),
});

const CityEnum = z.enum([
  "SAN_MIGUEL_DE_TUCUMAN",
  "TAFI_VIEJO",
  "YERBA_BUENA",
  "LULES",
  "TAFI_DEL_VALLE",
], { message: "Seleccione una ciudad" });

const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, "El nombre debe tener al menos 1 caracteres")
    .max(30, "El nombre no debe tener más de 30 caracteres"),
  address: z.string().optional(),
  city: CityEnum,
  phone: z.string().optional(),
  features: z.array(z.string()).optional(),
  capacity: z.coerce.number().nonnegative().optional(),
  rent: z.coerce.number().nonnegative().optional(),
  banquet: z.coerce.number().nonnegative().optional(),
  party: z.coerce.number().nonnegative().optional(),
});

const GuestInvitation = z.enum(["BANQUET", "PARTY", "TO_BE_CONFIRMED"], {
  message: "Seleccione un tipo de invitación",
});

const GuestSchema = z.object({
  id: z.string().optional(),
  first_name: z
    .string()
    .trim()
    .min(1, "El nombre debe tener al menos 1 caracter"),
  last_name: z
    .string()
    .trim()
    .min(1, "El apellido debe tener al menos 1 caracter"),
  invitation: GuestInvitation,
  observation: z.string().optional(),
  table_number: z.coerce.number().nonnegative().nullish(),
  eventId: z.string().optional(),
});

const InformationSchema = z.object({
  id: z.string().optional(),
  full_name: z
    .string()
    .trim()
    .min(1, "El nombre debe tener al menos 1 caracter")
    .max(100, "El nombre no debe tener más de 100 caracteres"),
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

const EventTypeEnum = z.enum(
  [
    "WEDDING",
    "BIRTHDAY",
    "OPENING",
    "ANNIVERSARY",
    "PARTY",
    "PARADE",
    "CONGRESS",
    "OTHER",
  ],
  { message: "Seleccione un tipo de evento" }
);

const EventOrganizationEnum = z.enum(
  ["COORDINATION", "PARTIAL", "COMPREHENSIVE"],
  { message: "Seleccione un tipo de organización" }
);

const EventSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no debe tener más de 30 caracteres"),
  date: z.date({ required_error: "Seleccione una fecha" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Seleccione una hora"),
  type: EventTypeEnum,
  email: z.string().email().nullish(),
  organization: EventOrganizationEnum,
  archived: z.boolean().default(false),
  providerId: z.string().nullish(),
  userId: z.string().nullish(),
  provider: ProviderSchema.nullish(),
  task: z.array(TaskSchema).optional(),
  budget: z.array(BudgetSchema).optional(),
  guest: z.array(GuestSchema).optional(),
  information: array(InformationSchema).optional(),
});

const MeetingSchema = z.object({
  id: z.string().optional(),
  note: z
    .string()
    .trim()
    .min(1, "La nota debe tener al menos 1 caracter")
    .max(30, "La nota no debe tener más de 30 caracteres"),
  date: z.date({ required_error: "Seleccione una fecha" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Seleccione una hora"),
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
