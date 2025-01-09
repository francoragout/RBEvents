import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { z } from "zod";
import { TaskSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, MoreHorizontal, Trash } from "lucide-react";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Task = z.infer<typeof TaskSchema>;

export function Draggable({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id || "",
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg shadow-sm hover:shadow-md relative ${
        isDragging ? "z-50" : ""
      }`}
      style={style}
    >
      <CardHeader>
        <div className="flex justify-between w-full">
          {task.label && (
            <Badge className="absolute top-0 left-0 rounded-md rounded-tr-none rounded-bl-none bg-foreground">
              {task.label === "ANA" ? "Ana" : "Belen"}
            </Badge>
          )}

          {task.priority && (
            <Badge
              variant="secondary"
              className="absolute top-0 right-0 rounded-md rounded-tl-none rounded-br-none items-center"
            >
              {task.priority === "HIGH" ? (
                <ArrowUpIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              ) : task.priority === "MEDIUM" ? (
                <ArrowRightIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              ) : (
                <ArrowDownIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              {task.priority === "HIGH"
                ? "Alta"
                : task.priority === "MEDIUM"
                ? "Media"
                : "Baja"}{" "}
            </Badge>
          )}
        </div>

        <CardDescription className="text-foreground">
          {task.title}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
