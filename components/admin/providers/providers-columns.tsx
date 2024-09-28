"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

import { z } from "zod";
import { ProviderSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Copy, UserRound } from "lucide-react";
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
    cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
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
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div className="flex">{row.getValue("address")}</div>,
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
    cell: ({ row }) => {
      const capacity = row.getValue("capacity") as number;
      if (!capacity) return null;
      return <div>{capacity}</div>;
    },
  },
  {
    accessorKey: "rent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rent" />
    ),
    cell: ({ row }) => {
      const rent = row.getValue("rent") as number;
      if (!rent) return null;
      return <div>${rent}</div>;
    }
  },
  {
    accessorKey: "dinner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dinner" />
    ),
    cell: ({ row }) => {
      const dinner = row.getValue("dinner") as number;
      if (!dinner) return null;
      return <div>${dinner}</div>;
    },
  },
  {
    accessorKey: "lunch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lunch" />
    ),
    cell: ({ row }) => {
      const lunch = row.getValue("lunch") as number;
      if (!lunch) return null;
      return <div>${lunch}</div>;
    },
  },
  {
    accessorKey: "after",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="After" />
    ),
    cell: ({ row }) => {
      const after = row.getValue("after") as number;
      if (!after) return null;
      return <div>${after}</div>;
    },
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
