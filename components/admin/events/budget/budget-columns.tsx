"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { BudgetSchema } from "@/lib/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { BudgetTableRowActions } from "./budget-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { SessionProvider } from "next-auth/react";

type Budget = z.infer<typeof BudgetSchema>;

export const BudgetColumns: ColumnDef<Budget>[] = [
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "paid_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Método de pago" />
    ),
    cell: ({ row }) => <div>{row.getValue("paid_method")}</div>,
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const total_price = row.getValue("total_price") as number;
      if (total_price) {
        return <div>${total_price}</div>;
      }
    },
  },
  {
    accessorKey: "amount_paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pagado" />
    ),
    cell: ({ row }) => {
      const amountPaid = row.getValue("amount_paid") as number;
      if (amountPaid) {
        return <div>${amountPaid}</div>;
      }
    },
  },
  {
    accessorKey: "due",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deuda" />
    ),
    cell: ({ row }) => {
      const total_price = row.getValue("total_price") as number;
      const amount_paid = row.getValue("amount_paid") as number;
      const due = total_price - amount_paid;
      if (total_price === 0 && amount_paid === 0) {
        return <p>No configurado</p>;
      } else if (due !== 0) {
        return <p className="text-red-600 font-medium">${due}</p>;
      } else {
        return <p className="text-green-600 font-medium">Pagado</p>;
      }
    },
  },
  {
    accessorKey: "observation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observación" />
    ),
    cell: ({ row }) => <div>{row.getValue("observation")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <SessionProvider>
        <BudgetTableRowActions row={row} />
      </SessionProvider>
    ),
  },
];
