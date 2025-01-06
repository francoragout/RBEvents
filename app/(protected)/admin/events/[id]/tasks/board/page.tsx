import { z } from "zod";
import { TaskSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import TasksBoard from "@/components/admin/events/tasks/tasks-board";

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
  const tasks = await getData(eventId);
  return (
    <div className="h-full flex-col">
      <TasksBoard tasks={tasks} eventId={eventId} />
    </div>
  );
}
