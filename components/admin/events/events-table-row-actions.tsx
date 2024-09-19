"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  ArchiveRestore,
  DollarSign,
  EyeIcon,
  List,
  ListTodo,
  MoreHorizontal,
  Pencil,
  Trash,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventSchema, ProviderSchema } from "@/lib/validations";
import Link from "next/link";
import { DeleteProvider } from "@/actions/provider";
import { toast } from "sonner";
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
import { ArchiveEvent, DeleteEvent } from "@/actions/event";
import { useSession } from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function EventsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const event = EventSchema.parse(row.original);

  const { data: session } = useSession();
  const role = session?.user?.role;

  const handleDelite = () => {
    DeleteEvent(event.id ?? "").then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleArchive = () => {
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
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
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
            size="sm"
          >
            <Link
              href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                event.id
              }/information`}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              <span>Information</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link
              href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                event.id
              }/budget`}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Budget</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="flex justify-start pl-2"
            size="sm"
          >
            <Link
              href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                event.id
              }/guests`}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Guests</span>
            </Link>
          </Button>

          {role === "ADMIN" && (
            <>
              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
                size="sm"
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
                size="sm"
              >
                <Link href={`/admin/events/${event.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="flex justify-start pl-2"
                size="sm"
                onClick={handleArchive}
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
                      your event &apos;{event.name}&apos; and remove your data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelite}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
