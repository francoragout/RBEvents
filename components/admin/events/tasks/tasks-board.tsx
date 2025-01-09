"use client";
import { useState } from "react";
import type { Column as ColumnType } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Droppable } from "./droppable";
import { z } from "zod";
import { TaskSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListTodo, SquareKanban } from "lucide-react";
import { usePathname } from "next/navigation";
import TaskCreateForm from "./task-create-form";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { UpdateTask } from "@/actions/task";
import { toast } from "sonner";

const COLUMNS: ColumnType[] = [
  {
    id: "BACKLOG",
    title: "Pendiente",
    color: "border-blue-500",
    icon: QuestionMarkCircledIcon,
  },
  { id: "TODO", title: "Por Hacer", color: "border-red-500", icon: CircleIcon },
  {
    id: "IN_PROGRESS",
    title: "En Progreso",
    color: "border-yellow-500",
    icon: StopwatchIcon,
  },
  {
    id: "DONE",
    title: "Terminada",
    color: "border-green-500",
    icon: CheckCircledIcon,
  },
];

type Task = z.infer<typeof TaskSchema>;

interface TasksBoardProps {
  tasks: Task[];
  eventId: string;
}

export default function TasksBoard({
  tasks: initialTasks,
  eventId,
}: TasksBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const pathname = usePathname();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );

      UpdateTask(taskId, eventId, { ...taskToUpdate, status: newStatus }).then(
        (response) => {
          if (!response.success) {
            toast.success(response.message);
            
          } else {
            toast.error(response.message);
          }
        }
      );
    }
  }
  return (
    <>
      <div className="flex justify-end space-x-4 mb-4">
        <Button variant="secondary" size="sm" className="h-8" asChild>
          <Link
            href={
              pathname === `/admin/events/${eventId}/tasks/board`
                ? `/admin/events/${eventId}/tasks`
                : `/admin/events/${eventId}/tasks/board`
            }
          >
            {pathname === `/admin/events/${eventId}/tasks` ? (
              <div className="flex space-x-2">
                <SquareKanban className="h-4 w-4" />
                <span className="hidden sm:flex">Tablero</span>
              </div>
            ) : (
              <div className="flex space-x-2">
                <ListTodo className="h-4 w-4" />
                <span className="hidden sm:flex">Lista</span>
              </div>
            )}
          </Link>
        </Button>

        <TaskCreateForm eventId={eventId} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Droppable
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </>
  );
}
