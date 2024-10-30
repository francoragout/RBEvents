"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { z } from "zod";
import { UserSchema } from "@/lib/validations";
import { UsersTableRowActions } from "./users-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

type User = z.infer<typeof UserSchema>;

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: () => <div className="sr-only">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback className="bg-secondary">
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center">
          {email}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(email);
                    toast.success("Correo electrónico copiado en portapapeles.");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copiar correo electrónico</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => <div className="flex text-primary font-medium">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado el" />
    ),
    cell: ({ row }) => {
      const createAt = new Date(row.getValue("createdAt"));
      return (
        <div className="truncate">
          {createAt.toUTCString().split(" ").slice(1, 4).join(" ")}
        </div>
      );
    },
  },
  {
    accessorKey: "events",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eventos" />
    ),
    cell: ({ row }) => {
      const events = row.original.events ?? [];
      const eventNames = events.map((event) => event.name).join(", ");
      return <div className="flex">{eventNames}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userRole = row.original.role;
      if (userRole === "ADMIN") {
        return null;
      }
      return <UsersTableRowActions row={row} />;
    },
  },
];
