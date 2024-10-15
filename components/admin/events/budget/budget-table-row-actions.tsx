"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BudgetSchema } from "@/lib/validations";
import { MoreHorizontal, Trash } from "lucide-react";
import BudgetEditForm from "./budget-edit-form";
import { DeleteBudget } from "@/actions/budget";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function BudgetTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const budget = BudgetSchema.parse(row.original);
  const { data: session } = useSession();

  const handleDelete = async () => {
    DeleteBudget(budget.id ?? "", budget.eventId ?? "").then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  if (session?.user?.role === "ADMIN") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            <BudgetEditForm budget={budget} />
            <Button
              variant="ghost"
              className="flex justify-start pl-2"
              onClick={handleDelete}
              size="sm"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return null;
}
