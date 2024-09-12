"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import InformationCreateForm from "./information-create-form";
import { Badge } from "@/components/ui/badge";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
}

export function InformationTableToolbar<TData>({
  table,
  eventId,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        Welcome to your wedding questionnaire!
      </div>
      <div className="flex space-x-4">
        <DataTableViewOptions table={table} />
        <InformationCreateForm eventId={eventId} />
      </div>
    </div>
  );
}
