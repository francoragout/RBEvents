"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  ArchiveRestore,
  DollarSign,
  EyeIcon,
  ListTodo,
  Pencil,
  Trash,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventSchema } from "@/lib/validations";
import Link from "next/link";
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
import { ArchiveEvent, DeleteEvent, UnarchiveEvent } from "@/actions/event";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function EventsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const event = EventSchema.parse(row.original);
  const pathname = usePathname();
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

  const handleUnarchive = () => {
    UnarchiveEvent(event.id ?? "").then((response) => {
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
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
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
              <span>Información</span>
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
              <span>Presupuesto</span>
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
              <span>Invitados</span>
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
                  <span>Tareas</span>
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
                  <span>Editar</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="flex justify-start pl-2"
                size="sm"
                onClick={event.archived ? handleUnarchive : handleArchive}
              >
                <ArchiveRestore className="mr-2 h-4 w-4" />
                <span>
                  {pathname === "/admin/events/archived"
                    ? "Desarchivar"
                    : "Archivar"}
                </span>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start pl-2 w-full"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Estas completamente seguro?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente el evento &apos;{event.name}&apos; y todos
                      los datos asociados de nuestros servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelite}>
                      Continuar
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
