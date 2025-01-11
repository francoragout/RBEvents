"use client";

import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setTasks, updateTask } from "@/lib/features/tasks/TaskSlice";

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

export default function TasksBoard({ tasks, eventId }: TasksBoardProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks, dispatch]);

  const tasksState = useSelector((state: RootState) => state.tasks.tasks);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const task = tasksState.find((task) => task.id === taskId);

    if (!task || task.status === newStatus) return;

    const updatedTask = { ...task, status: newStatus };

    dispatch(updateTask(updatedTask));

    UpdateTask(taskId, eventId, updatedTask).then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <TaskCreateForm eventId={eventId} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Droppable
                key={column.id}
                column={column}
                tasks={tasksState.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </>
  );
}
