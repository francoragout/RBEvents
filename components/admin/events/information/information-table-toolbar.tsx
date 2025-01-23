"use client";

import { Table } from "@tanstack/react-table";
import InformationCreateForm from "./information-create-form";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
  information: number;
}

export function InformationTableToolbar<TData>({
  table,
  eventId,
  information,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Clientes
        </h3>
      </div>
      <div className="flex space-x-4">
        <InformationCreateForm eventId={eventId} information={information} />
      </div>
    </div>
  );
}
