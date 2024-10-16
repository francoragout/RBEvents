"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import BudgetCreateForm from "./budget-create-form";
import { useSession } from "next-auth/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
}

export function BudgetTableToolbar<TData>({
  table,
  eventId,
}: DataTableToolbarProps<TData>) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  console.log(role);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar presupuesto..."
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex space-x-4">
        {/* <DataTableViewOptions table={table} /> */}
        {role === "ADMIN" && <BudgetCreateForm eventId={eventId} />}
      </div>
    </div>
  );
}
