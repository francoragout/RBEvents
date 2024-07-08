import { z } from "zod";

import { columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { TaskSchema } from "@/lib/validations";
import { db } from "@/lib/db";

type Task = z.infer<typeof TaskSchema>;

async function getData(eventId: string): Promise<Task[]> {
  const tasks = await db.task.findMany({
    where: {
      eventId: eventId, 
    },
  });

  return tasks.map((task) => TaskSchema.parse(task));
}

export default async function TasksPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;

  // Pasar eventId a getData
  const tasks = await getData(eventId);
  return (
    <div className="h-full flex-col">
      <DataTable data={tasks} columns={columns} eventId={eventId} />
    </div>
  );
}