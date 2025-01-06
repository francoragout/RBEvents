import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { TaskSchema } from "@/lib/validations";

type Task = z.infer<typeof TaskSchema>;

export function Draggable({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id || "",
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg shadow-sm hover:shadow-md"
      style={style}
    >
      <CardHeader>
        <CardDescription className="text-foreground">
          {task.title}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
