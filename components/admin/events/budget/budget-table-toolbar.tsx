"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import BudgetCreateForm from "./budget-create-form";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
}

export function BudgetTableToolbar<TData>({
  table,
  eventId,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter budgets..."
          value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex space-x-4">
        <DataTableViewOptions table={table} />
        <BudgetCreateForm eventId={eventId} />
      </div>
    </div>
  );
}
