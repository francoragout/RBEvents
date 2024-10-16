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
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ciudad" />
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
      <DataTableColumnHeader column={column} title="Dirección" />
    ),
    cell: ({ row }) => <div className="flex">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
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
                    toast.success("Teléfono copiado al portapapeles.");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copiar numero de teléfono</p>
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
      <DataTableColumnHeader column={column} title="Capacidad" />
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
      <DataTableColumnHeader column={column} title="Alquiler" />
    ),
    cell: ({ row }) => {
      const rent = row.getValue("rent") as number;
      if (!rent) return null;
      return <div className="text-primary font-medium">${rent}</div>;
    },
  },
  {
    accessorKey: "banquet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Almuerzo/Cena" />
    ),
    cell: ({ row }) => {
      const dinner = row.getValue("banquet") as number;
      if (!dinner) return null;
      return <div className="text-primary font-medium">${dinner}</div>;
    },
  },
  {
    accessorKey: "party",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fiesta" />
    ),
    cell: ({ row }) => {
      const after = row.getValue("party") as number;
      if (!after) return null;
      return <div className="text-primary font-medium">${after}</div>;
    },
  },
  {
    accessorKey: "features",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Características" />
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
