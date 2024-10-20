"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { InformationSchema } from "@/lib/validations";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteInformation } from "@/actions/information";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InformationEditForm from "./information-edit-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function InformationTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const information = InformationSchema.parse(row.original);

  const handleDelete = async () => {
    DeleteInformation(information.id ?? "").then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

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
          <InformationEditForm information={information} />
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
