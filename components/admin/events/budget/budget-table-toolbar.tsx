"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import BudgetCreateForm from "./budget-create-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { DeleteBudgets } from "@/actions/budget";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  eventId: string;
}

export function BudgetTableToolbar<TData>({
  table,
  eventId,
}: DataTableToolbarProps<TData>) {
  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const budgetsIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteBudgets(budgetsIds, eventId).then((response) => {
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
        {selectedRowsCount > 1 &&
          (role === "ADMIN" && (
            <Button
              className="h-8"
              onClick={handleDeleteSelected}
              size="sm"
              variant="outline"
            >
              <div className="space-x-2 flex">
                <Trash className="h-4 w-4" />
                <span className="hidden sm:flex">Eliminar Presupuestos</span>
              </div>
            </Button>
          ))}
        {role === "ADMIN" && <BudgetCreateForm eventId={eventId} />}
      </div>
    </div>
  );
}
