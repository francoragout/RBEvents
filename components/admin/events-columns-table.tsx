"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArchiveRestore,
  DollarSign,
  EyeIcon,
  ListTodo,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { z } from "zod";
import { EventSchema } from "@/lib/validations";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { ArchiveEvent, DeleteEvent } from "@/actions/event";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

type Event = z.infer<typeof EventSchema>;

export const EventsColumnsTable: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Type</div>,
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toUTCString().split(" ").slice(0, 4).join(" ")}</div>;
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-left">Time</div>,
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    id: "daysLeft",
    header: "Days Left",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
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
    cell: ({ row }) => <div>{row.getValue("tasks")}</div>,
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      const deleteEvent = () => {
        DeleteEvent(event.id ?? "").then((response) => {
          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        });
      };

      const archiveEvent = () => {
        ArchiveEvent(event.id ?? "").then((response) => {
          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        });
      };

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
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event.id}/overview`}>
                  <EyeIcon className="mr-2 h-4 w-4" />
                  <span>Overview</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event.id}/tasks`}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  <span>Tasks</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event.id}/budget`}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Budget</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="flex justify-start pl-2"
                onClick={archiveEvent}
              >
                <ArchiveRestore className="mr-2 h-4 w-4" />
                <span>Archive</span>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start pl-2 w-full"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your event and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteEvent}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
