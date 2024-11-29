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
        Este es un cuestionario para saber mas sobre ustedes!
      </div>
      <div className="flex space-x-4">
        <InformationCreateForm eventId={eventId} information={information}/>
      </div>
    </div>
  );
}
