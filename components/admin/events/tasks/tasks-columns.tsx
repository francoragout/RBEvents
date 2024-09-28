"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { labels, priorities, statuses } from "@/lib/data";
import { TaskSchema } from "@/lib/validations";

import { z } from "zod";
import { TasksTableRowActions } from "./tasks-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

type Task = z.infer<typeof TaskSchema>;

export const TasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="default">{label.label}</Badge>}
          <span className="max-w-[700px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      switch (status.value) {
        case "BACKLOG":
          return (
            <div className="flex items-center text-blue-500">
              {status.icon && (
                <status.icon className="mr-2 h-4 w-4 text-muted-foreground text-blue-500" />
              )}
              <span>{status.label}</span>
            </div>
          );
        case "TODO":
          return (
            <div className="flex items-center text-red-500">
              {status.icon && (
                <status.icon className="mr-2 h-4 w-4 text-muted-foreground text-red-500" />
              )}
              <span>{status.label}</span>
            </div>
          );
        case "IN_PROGRESS":
          return (
            <div className="flex items-center text-yellow-500">
              {status.icon && (
                <status.icon className="mr-2 h-4 w-4 text-muted-foreground text-yellow-500" />
              )}
              <span>{status.label}</span>
            </div>
          );
        case "DONE":
          return (
            <div className="flex items-center text-green-500">
              {status.icon && (
                <status.icon className="mr-2 h-4 w-4 text-muted-foreground text-green-500" />
              )}
              <span>{status.label}</span>
            </div>
          );
        default:
          return null;
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TasksTableRowActions row={row} />,
  },
];
