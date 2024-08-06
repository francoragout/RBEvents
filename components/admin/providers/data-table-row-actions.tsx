"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProviderSchema } from "@/lib/validations";
import Link from "next/link";
import { ArchiveRestore, Pencil } from "lucide-react";
import { DeleteProvider } from "@/actions/provider";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const provider = ProviderSchema.parse(row.original);

  const deleteProvider = () => {
    DeleteProvider(provider.id ?? "").then((response) => {
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
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button asChild variant="ghost" className="flex justify-start pl-2">
          <Link href={`/admin/providers/${provider.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="flex justify-start pl-2 w-full"
          onClick={deleteProvider}
        >
          <ArchiveRestore className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
