"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { GuestSchema } from "@/lib/validations";

import { z } from "zod";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { GuestsTableRowActions } from "./guests-table-row-actions";
import { guestTypes } from "@/lib/data";

type Guest = z.infer<typeof GuestSchema>;

export const GuestsColumns: ColumnDef<Guest>[] = [
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("last_name")}</div>;
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("first_name")}</div>;
    },
  },
  {
    accessorKey: "guest_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest Type" />
    ),
    cell: ({ row }) => {
      const guestType = guestTypes.find(
        (type) => type.value === row.getValue("guest_type")
      );

      if (!guestType) return null;
      return guestType.label;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "table_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Table Number" />
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
      <DataTableColumnHeader column={column} title="Observation" />
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
