// import { z } from "zod";

// export const taskSchema = z.object({
//   title: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
//   eventId: z.string(),
// })

// import { z } from 'zod';

// // EventType Enum Schema
// const EventType = z.enum(['WEDDING', 'BIRTHDAY', 'OPENING', 'MEETING', 'OTHER']);

// // Event Model Schema
// export const EventSchema = z.object({
//   name: z.string().min(1),
//   type: EventType,
//   date: z.date(),
//   time: z.string(), // Custom validation for time format can be added if needed
//   archived: z.boolean().optional(),
//   // tasks: This would be validated separately or differently depending on context
// });

// // Task Model Schema
// export const TaskSchema = z.object({
//   title: z.string().min(1),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
// });

import { z } from "zod";

// Define the EventType enum
const EventType = z.enum(
  ["WEDDING", "BIRTHDAY", "OPENING", "MEETING", "OTHER"],
  {
    message: "Please select event type.",
  }
);

// Zod schema for the Event model
const EventSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Name must not be longer than 20 characters.",
    }),
  type: z.enum(["WEDDING", "BIRTHDAY", "OPENING", "MEETING", "OTHER"], {
    message: "Please select type.",
  }),
  date: z.date({
    message: "Please select date.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please select time.",
  }),

  archived: z.boolean().default(false),
});

// Zod schema for the Task model
const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  eventId: z.string().optional(),
});

// Export the schemas if needed
export { EventType, EventSchema, TaskSchema };
