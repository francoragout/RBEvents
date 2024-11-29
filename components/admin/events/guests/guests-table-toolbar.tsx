"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import GuestCreateForm from "./guest-create-form";
import { Download, Trash } from "lucide-react";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";
import { invitations } from "@/lib/data";
import { DeleteGuests } from "@/actions/guest";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
  guestsList: any[];
  eventName: string;
}

export function GuestsTableToolbar<TData>({
  table,
  eventId,
  guestsList,
  eventName,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const guestsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteGuests(guestsIds, eventId).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  const { data: session } = useSession();
  const role = session?.user?.role;

  const DownloadGuests = () => {
    const ws = XLSX.utils.json_to_sheet(guestsList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invitados");
    XLSX.writeFile(wb, `Invitados ${eventName}.xlsx`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar invitados..."
          value={
            (table.getColumn("last_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("last_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("invitation") && (
          <DataTableFacetedFilter
            column={table.getColumn("invitation")}
            title="Invitación"
            options={invitations}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-4">
        {selectedRowsCount > 1 && (
          <Button
            className="h-8"
            onClick={handleDeleteSelected}
            size="sm"
            variant="outline"
          >
            <div className="space-x-2 flex">
              <Trash className="h-4 w-4" />
              <span className="hidden sm:flex">Eliminar Invitados</span>
            </div>
          </Button>
        )}
        {role === "ADMIN" && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8"
            onClick={DownloadGuests}
          >
            <div className="space-x-2 flex">
              <Download className="h-4 w-4" />
              <span className="hidden sm:flex">Exportar</span>
            </div>
          </Button>
        )}
        <GuestCreateForm eventId={eventId} />
      </div>
    </div>
  );
}
