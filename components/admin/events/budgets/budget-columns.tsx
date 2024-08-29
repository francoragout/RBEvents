"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { BudgetSchema } from "@/lib/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { BudgetTableRowActions } from "./budget-table-row-actions";

type Budget = z.infer<typeof BudgetSchema>;

export const BudgetColumns: ColumnDef<Budget>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "paid_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid Method" />
    ),
    cell: ({ row }) => <div>{row.getValue("paid_method")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "amount_paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Paid" />
    ),
    cell: ({ row }) => <div>{row.getValue("amount_paid")}</div>,
  },
  {
    accessorKey: "settled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Settled" />
    ),
    cell: ({ row }) => <div>{row.getValue("settled")}</div>,
  },
  {
    accessorKey: "observation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observation" />
    ),
    cell: ({ row }) => <div>{row.getValue("observation")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <BudgetTableRowActions row={row} />,
  },
];
