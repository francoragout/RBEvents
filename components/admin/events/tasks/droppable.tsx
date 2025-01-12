import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType } from "@/lib/types";
import { Draggable } from "./draggable";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { TaskSchema } from "@/lib/validations";

type Task = z.infer<typeof TaskSchema>;

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

const priorityOrder = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export function Droppable({ column, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const sortedTasks = tasks.sort((a, b) => (priorityOrder[a.priority ?? 'LOW'] - priorityOrder[b.priority ?? 'LOW']));

  return (
    <Card ref={setNodeRef} className={isOver ? "bg-secondary" : ""}>
      <CardHeader className={`border-t-8 rounded-t-lg ${column.color}`}>
        <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center justify-between">
          {column.title}
          <column.icon />
        </CardTitle>
      </CardHeader>
      <CardContent  className="space-y-4">
        {sortedTasks.map((task) => {
          return <Draggable key={task.id} task={task} />;
        })}
      </CardContent>
    </Card>
  );
}
