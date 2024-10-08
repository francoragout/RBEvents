"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { guestTypes } from "@/lib/data";
import GuestCreateForm from "./guest-create-form";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
  guestsList: any[];
}

export function GuestsTableToolbar<TData>({
  table,
  eventId,
  guestsList,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { data: session } = useSession();
  const role = session?.user?.role;

  const DownloadGuests = () => {
    const ws = XLSX.utils.json_to_sheet(guestsList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Guests");
    XLSX.writeFile(wb, "guests.xlsx");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter guests..."
          value={
            (table.getColumn("last_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("last_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("guest_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("guest_type")}
            title="Guest Type"
            options={guestTypes}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-4">
        {role === "ADMIN" && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8"
            onClick={DownloadGuests}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
        <DataTableViewOptions table={table} />
        <GuestCreateForm eventId={eventId} />
      </div>
    </div>
  );
}
