"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { priorities, statuses } from "@/lib/data";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import TaskCreateForm from "./task-create-form";
import { DeleteTasks } from "@/actions/task";
import { toast } from "sonner";
import { ListTodo, SquareKanban, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
}

export function TasksTableToolbar<TData>({
  table,
  eventId,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const pathname = usePathname();

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteTasks(tasksIds, eventId).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar tareas..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Prioridad"
            options={priorities}
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
              <span className="hidden sm:flex">Eliminar Tareas</span>
            </div>
          </Button>
        )}

        <TaskCreateForm eventId={eventId} />
      </div>
    </div>
  );
}
