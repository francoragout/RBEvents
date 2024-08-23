"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

import { z } from "zod";
import { ProviderSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProvidersTableRowActions } from "./providers-table-row-actions";
import { cities, features } from "@/lib/data";

type Provider = z.infer<typeof ProviderSchema>;

export const ProvidersColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div className="flex">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      const city = cities.find((city) => city.value === row.getValue("city"));

      if (!city) return null;
      return city.label;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      if (!phone) return null;
      return (
        <div className="flex items-center">
          {phone}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(phone);
                    toast.success("Phone number copied to clipboard");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy phone number</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
  },
  {
    accessorKey: "rent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rent" />
    ),
    cell: ({ row }) => <div>{row.getValue("rent")}</div>,
  },
  {
    accessorKey: "dinner_card",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dinner Card" />
    ),
    cell: ({ row }) => <div>{row.getValue("dinner_card")}</div>,
  },
  {
    accessorKey: "lunch_card",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lunch Card" />
    ),
    cell: ({ row }) => <div>{row.getValue("lunch_card")}</div>,
  },
  {
    accessorKey: "after_card",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="After Card" />
    ),
    cell: ({ row }) => <div>{row.getValue("after_card")}</div>,
  },
  {
    accessorKey: "features",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Features" />
    ),
    cell: ({ row }) => {
      const providerFeatures = row.getValue("features") as string[];
      const featureLabels = providerFeatures
        .map((feature) => features.find((f) => f.id === feature)?.label)
        .filter((label) => label)
        .join(", ");

      return <div className="flex">{featureLabels}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <ProvidersTableRowActions row={row} />,
  },
];
