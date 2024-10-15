"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ProvidersTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter providers..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex space-x-4">
        <Button variant="default" size="sm" className="h-8" asChild>
          <Link href="/admin/providers/create">New Provider</Link>
        </Button>
      </div>
    </div>
  );
}
