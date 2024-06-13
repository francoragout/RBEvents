"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArchiveRestore,
  ArrowUpDown,
  EyeIcon,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Badge } from "../ui/badge";

const ExtendedEventSchema = EventSchema.extend({
  id: z.string(),
  archived: z.boolean(),
});

type Event = z.infer<typeof ExtendedEventSchema>;

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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      const deleteEvent = () => {
        DeleteEvent(event.id).then((response) => {
          if (response.success) {
            toast({
              title: response.message,
            });
          } else {
            toast({
              variant: "destructive",
              title: response.message,
              description: "Something went wrong.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }
        });
      };

      const archiveEvent = () => {
        ArchiveEvent(event.id).then((response) => {
          if (response.success) {
            toast({
              title: response.message,
            });
          } else {
            toast({
              variant: "destructive",
              title: response.message,
              description: "Something went wrong.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
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
            <DropdownMenuItem>
              <Link
                href={`/admin/events/${event.id}`}
                className="flex w-full h-5"
              >
                <EyeIcon className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/admin/events/${event.id}/edit`}
                className="flex w-full h-5"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex justify-start h-8 pl-2 w-full"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
            <DropdownMenuItem>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start h-5 pl-0 w-full"
                onClick={archiveEvent}
              >
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Archive
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
