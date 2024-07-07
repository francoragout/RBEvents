"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "@/components/admin/data";
import { TaskSchema } from "@/lib/validations";
import { MoreHorizontal, Trash } from "lucide-react";
import { DeleteTask } from "@/actions/task";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = TaskSchema.parse(row.original);

  const deleteTask = async () => {
    DeleteTask(task.id ?? "").then((response) => {
      if (response.success) {
        toast({
          title: response.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: response.message,
          description: "Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex justify-start pl-2"
            onClick={deleteTask}
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
