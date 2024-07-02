import { z } from "zod";

import { columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { TaskSchema } from "@/lib/validations";
import { db } from "@/lib/db";

// Simulate a database read for tasks.

const ExtendedTaskSchema = TaskSchema.extend({
  eventId: z.string(),
  id: z.string(),
});

type Task = z.infer<typeof ExtendedTaskSchema>;

async function getData(): Promise<Task[]> {
  const tasks = await db.task.findMany();

  return tasks.map((task) => ExtendedTaskSchema.parse(task));
}

export default async function TasksPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;
  

  const tasks = await getData();
  return (
    <div className="h-full flex-col">
      <DataTable data={tasks} columns={columns} event={eventId}/>
    </div>
  );
}
