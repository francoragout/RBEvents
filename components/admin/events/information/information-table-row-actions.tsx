"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { InformationSchema } from "@/lib/validations";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import InformationEditForm from "./information-edit-form";
import { DeleteInformation } from "@/actions/information";

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
    <div className="flex space-x-4">
      <InformationEditForm information={information} />
      <Button
        variant="outline"
        className="flex justify-start pl-2"
        onClick={handleDelete}
        size="sm"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
