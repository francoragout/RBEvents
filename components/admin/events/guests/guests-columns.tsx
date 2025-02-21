"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GuestSchema } from "@/lib/validations";
import { z } from "zod";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { GuestsTableRowActions } from "./guests-table-row-actions";
import { invitations } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";

type Guest = z.infer<typeof GuestSchema>;

export const GuestsColumns: ColumnDef<Guest>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("last_name")}</div>;
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("first_name")}</div>;
    },
  },
  {
    accessorKey: "invitation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invitación" />
    ),
    cell: ({ row }) => {
      const invitation = invitations.find(
        (invitation) => invitation.value === row.getValue("invitation")
      );

      if (!invitation) return null;
      return invitation.label;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "table_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número de mesa" />
    ),
    cell: ({ row }) => {
      const table_number = row.getValue("table_number") as number;
      if (!table_number) return null;
      return <div>{table_number}</div>;
    },
  },
  {
    accessorKey: "observation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observación" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("observation")}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <GuestsTableRowActions row={row} />,
  },
];
