"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { EventSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { organizations, types } from "../../../lib/data";
import { EventsTableRowActions } from "./events-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { format } from "date-fns/format";
import { es } from "date-fns/locale";

type Event = z.infer<typeof EventSchema>;

export const EventsColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue("type"));

      if (!type) return null;
      return type.label;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatDate = (date: Date) => {
        date.setHours(date.getHours() + 3);
        return format(date, "EEE, dd MMM yyyy", { locale: es });
      };
      
      return (
        <div className="truncate">
          {formatDate(date)}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-left">Hora</div>,
    cell: ({ row }) => <div>{row.getValue("time")}</div>,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salón" />
    ),
    cell: ({ row }) => <div>{row.original.provider?.name}</div>,
  },
  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organización" />
    ),
    cell: ({ row }) => {
      const organization = organizations.find(
        (organization) => organization.value === row.getValue("organization")
      );

      if (!organization) return null;
      return organization.label;
    },
  },
  {
    accessorKey: "days left",
    header: "Días restantes",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let daysLeft;
      switch (true) {
        case diffDays === 1:
          daysLeft = <Badge>Mañana</Badge>;
          break;
        case diffDays === 0:
          daysLeft = <Badge>Hoy</Badge>;
          break;
        case diffDays < 0:
          daysLeft = <Badge variant="secondary">Expirado</Badge>;
          break;
        default:
          daysLeft = diffDays;
      }
      return <div className="font-medium text-primary">{daysLeft}</div>;
    },
  },
  {
    accessorKey: "task",
    header: () => <div className="text-left">Tareas</div>,
    cell: ({ row }) => {
      const tasks = row.original.task ?? [];
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
    accessorKey: "guest",
    header: () => <div className="text-left">Invitados</div>,
    cell: ({ row }) => {
      const guests = row.original.guest ?? [];
      const totalGuests = guests.length;
      const confirmedGuests = guests.filter(
        (guest) =>
          guest.guest_type === "AT_THE_BEGINNING" ||
          guest.guest_type === "AFTERWARDS"
      ).length;
      return (
        <div>
          {confirmedGuests} / {totalGuests}
        </div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: () => <div className="text-left">Presupuesto</div>,
    cell: ({ row }) => {
      const budget = row.original.budget ?? [];
      const totalBudget = budget.length;
      const paidBudget = budget.filter((budget) => {
        if (budget.amount_paid === 0 && budget.total_price === 0) {
          return false;
        } else {
          return budget.amount_paid === budget.total_price;
        }
      }).length;

      return (
        <div>
          {paidBudget} / {totalBudget}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EventsTableRowActions row={row} />,
  },
];
