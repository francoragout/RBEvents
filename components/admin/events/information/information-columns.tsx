"use client";

import { InformationSchema } from "@/lib/validations";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { InformationTableRowActions } from "./information-table-row-actions";

type Information = z.infer<typeof InformationSchema>;

export const InformationColumns: ColumnDef<Information>[] = [
  {
    accessorKey: "full_name",
    header: () => <div className="text-left">Nombre:</div>,
    cell: ({ row }) => <Badge>{row.getValue("full_name")}</Badge>,
  },
  {
    accessorKey: "mother",
    header: () => <div className="text-left">Madre:</div>,
    cell: ({ row }) => {
      const mother = row.getValue("mother");
      if (!mother) {
        return "-";
      }
      return mother;
    },
  },
  {
    accessorKey: "father",
    header: () => <div className="text-left">Padre:</div>,
    cell: ({ row }) => {
      const father = row.getValue("father");
      if (!father) {
        return "-";
      }
      return father;
    },
  },
  {
    accessorKey: "brothers",
    header: () => <div className="text-left">Hermanos:</div>,
    cell: ({ row }) => {
      const brothers = row.getValue("brothers");
      if (!brothers) {
        return "-";
      }
      return brothers;
    },
  },
  {
    accessorKey: "children",
    header: () => <div className="text-left">Hijos:</div>,
    cell: ({ row }) => {
      const children = row.getValue("children");
      if (!children) {
        return "-";
      }
      return children;
    },
  },
  {
    accessorKey: "godparents",
    header: () => <div className="text-left">Padrinos:</div>,
    cell: ({ row }) => {
      const godparents = row.getValue("godparents");
      if (!godparents) {
        return "-";
      }
      return godparents;
    },
  },
  {
    accessorKey: "witnesses",
    header: () => <div className="text-left">Testigos:</div>,
    cell: ({ row }) => {
      const witnesses = row.getValue("witnesses");
      if (!witnesses) {
        return "-";
      }
      return witnesses;
    },
  },
  {
    accessorKey: "nutrition",
    header: () => <div className="text-left">Alimentacion:</div>,
    cell: ({ row }) => {
      const nutrition = row.getValue("nutrition");
      if (!nutrition) {
        return "-";
      }
      return nutrition;
    },
  },
  {
    accessorKey: "allergies",
    header: () => <div className="text-left">Alergias:</div>,
    cell: ({ row }) => {
      const allergies = row.getValue("allergies");
      if (!allergies) {
        return "-";
      }
      return allergies;
    },
  },
  {
    accessorKey: "drinks",
    header: () => <div className="text-left">Alcohol:</div>,
    cell: ({ row }) => {
      const drinks = row.getValue("drinks");
      if (!drinks) {
        return "-";
      }
      return drinks;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <InformationTableRowActions row={row} />,
  },
];
