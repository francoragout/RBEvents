import { z } from "zod";

import { columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";
import { taskSchema } from "@/lib/validations";
import { db } from "@/lib/db";

// Simulate a database read for tasks.
async function getTasks(params: { id: string }) {
  const data = await db.task.findMany({
    where: {
      id: params.id,
    },
  });

  return data;
}

export default async function TasksPage({ params }: { params: { id: string } }) {
  const tasks = await getTasks(params);

  return (
    <div className="h-full flex-col">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
