import { useDraggable } from "@dnd-kit/core";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { z } from "zod";
import { TaskSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, MoreVertical, Trash } from "lucide-react";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import TaskEditForm from "./task-edit-form";
import { DeleteTask } from "@/actions/task";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeTask } from "@/lib/features/tasks/TaskSlice";

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

  const dispatch = useDispatch();

  const handleDelete = async () => {
    DeleteTask(task.id || "").then((response) => {
      if (response.success) {
        toast.success(response.message);
        dispatch(removeTask(task.id ?? ""));
      } else {
        toast.error(response.message);
      }
    });
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
            <Badge className="absolute top-0 left-0 rounded-md rounded-tr-none rounded-bl-none">
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
        <div className="flex justify-between space-x-2">
          <CardDescription className="text-foreground">
            {task.title}
          </CardDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                <TaskEditForm task={task} />
                <Button
                  variant="ghost"
                  className="flex justify-start pl-2"
                  onClick={handleDelete}
                  size="sm"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
}
