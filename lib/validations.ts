import { z } from "zod";

const EventType = z.enum(
  ["WEDDING", "BIRTHDAY", "OPENING", "MEETING", "OTHER"],
  {
    message: "Please select type.",
  }
);

const TaskLabel = z.enum(["ANA", "BELU"], {
  message: "Please select label.",
});

const TaskStatus = z.enum(
  ["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELLED"],
  {
    message: "Please select status.",
  }
);

const TaskPriority = z.enum(["LOW", "MEDIUM", "HIGH"], {
  message: "Please select priority.",
});

const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(6, {
      message: "Name must be at least 6 characters.",
    })
    .max(60, {
      message: "Name must not be longer than 60 characters.",
    }),
  status: TaskStatus,
  label: TaskLabel,
  priority: TaskPriority,
  eventId: z.string().optional(),
});

const EventSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  type: EventType,
  date: z.date({
    message: "Please select date.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please select time.",
  }),
  archived: z.boolean().default(false),
  tasks: z.array(TaskSchema).default([]),
});

export {
  EventType,
  EventSchema,
  TaskLabel,
  TaskStatus,
  TaskPriority,
  TaskSchema,
};
