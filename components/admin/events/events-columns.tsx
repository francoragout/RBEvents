"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { EventSchema, TaskSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { organizations, types } from "../../../lib/data";
import { EventsTableRowActions } from "./events-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

type Event = z.infer<typeof EventSchema>;
type Task = z.infer<typeof TaskSchema>;

export const EventsColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue("type"));

      if (!type) return null;
      return type.label;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="truncate">
          {date.toUTCString().split(" ").slice(0, 4).join(" ")}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-left">Time</div>,
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "venue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="venue" />
    ),
    cell: ({ row }) => <div>{row.getValue("venue")}</div>,
  },
  {
    accessorKey: "days left",
    header: "Days Left",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log(date, today);
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let daysLeft;
      switch (true) {
        case diffDays === 1:
          daysLeft = <Badge>Tomorrow</Badge>;
          break;
        case diffDays === 0:
          daysLeft = <Badge>Today</Badge>;
          break;
        case diffDays < 0:
          daysLeft = <Badge variant="secondary">Expired</Badge>;
          break;
        default:
          daysLeft = diffDays;
      }
      return <div>{daysLeft}</div>;
    },
  },
  {
    accessorKey: "tasks",
    header: () => <div className="text-left">Tasks</div>,
    cell: ({ row }) => {
      const tasks: Task[] = row.getValue("tasks");
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(
        (task) => task.status === "DONE"
      ).length;
      return (
        <div>
          {completedTasks} / {totalTasks}
        </div>
      );
    },
  },
  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => {
      const organization = organizations.find((organization) => organization.value === row.getValue("organization"));

      if (!organization) return null;
      return organization.label;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EventsTableRowActions row={row} />,
  },
];
