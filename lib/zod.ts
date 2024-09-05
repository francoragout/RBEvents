import z from "zod";


const InformationSchema = z.object({
  id: z.string().optional(),
  fn_couple_1: z.string(),
  fn_couple_2: z.string(),
  fn_children: z.string().nullish(),
  fn_father_1: z.string().nullish(),
  fn_father_2: z.string().nullish(),
  fn_mother_1: z.string().nullish(),
  fn_mother_2: z.string().nullish(),
  fn_brothers_1: z.string().nullish(),
  fn_brothers_2: z.string().nullish(),
  fn_godparents_1: z.string().nullish(),
  fn_godparents_2: z.string().nullish(),
  fn_witnesses_1: z.string().nullish(),
  fn_witnesses_2: z.string().nullish(),
  nutrition_1: z.string().nullish(),
  nutrition_2: z.string().nullish(),
  allergies_1: z.string().nullish(),
  allergies_2: z.string().nullish(),
  drinks_1: z.string().nullish(),
  drinks_2: z.string().nullish(),
  attendant: z.string().nullish(),
  observation: z.string().nullish(),
  eventId: z.string().cuid(),
});

const ListSchema = z.object({
  id: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  after_guest: z.boolean().default(false),
  observation: z.string().nullable(),
  table_number: z.number().int().nullable(),
  eventId: z.string().cuid(),
});

const TaskLabelEnum = z.enum(["ANA", "BELEN"]);
const TaskStatusEnum = z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "DONE"]);
const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  status: TaskStatusEnum,
  label: TaskLabelEnum.nullish(),
  priority: TaskPriorityEnum.nullish(),
  eventId: z.string().cuid(),
});

const CityEnum = z.enum([
  "SAN_MIGUEL_DE_TUCUMAN",
  "TAFI_VIEJO",
  "YERBA_BUENA",
  "LULES",
  "TAFI_DEL_VALLE",
]);

const BudgetSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  paymentMethod: z.string().nullish(),
  amount: z.number().int().nullish(),
  amount_paid: z.number().int().nullish(),
  observation: z.string().nullish(),
  eventId: z.string().cuid(),
});

const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string().nullish(),
  city: CityEnum,
  phone: z.string().nullish(),
  features: z.array(z.string()),
  capacity: z.number().int().nullish(),
  rent: z.number().int().nullish(),
  dinner: z.number().int().nullish(),
  lunch: z.number().int().nullish(),
  after: z.number().int().nullish(),
});

const EventTypeEnum = z.enum([
  "WEDDING",
  "BIRTHDAY",
  "OPENING",
  "ANNIVERSARY",
  "PARTY",
  "CONGRESS",
  "PRODUCT_LAUNCH",
  "PARADE",
  "OTHER",
]);

const EventOrganizationEnum = z.enum([
  "COORDINATION",
  "PARTIAL",
  "COMPREHENSIVE",
]);

const EventSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  time: z.string(),
  date: z.date(),
  type: EventTypeEnum,
  organization: EventOrganizationEnum,
  providerId: z.string().optional(),
  userId: z.string().optional(),
  archived: z.boolean().default(false),
});

export {
  EventSchema,
  InformationSchema,
  ListSchema,
  TaskSchema,
  ProviderSchema,
  BudgetSchema,
};
