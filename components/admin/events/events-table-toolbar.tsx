"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function EventsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const { data: session } = useSession()
  const role = session?.user?.role

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter events..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex space-x-4">
        <DataTableViewOptions table={table} />
        {role === "ADMIN" && (
          <Button variant="default" size="sm" className="h-8" asChild>
            <Link href="/admin/events/create">New Event</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
