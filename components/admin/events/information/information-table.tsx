"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { InformationTableToolbar } from "./information-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  eventId: string;
}

export function InformationTable<TData, TValue>({
  columns,
  data,
  eventId,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const information = data.length;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const headers = table.getHeaderGroups()[0]?.headers ?? [];
  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <InformationTableToolbar
        table={table}
        eventId={eventId}
        information={information}
      />
      <div className="rounded-md border">
        <Table>
          <TableBody>
            {headers.map((header) => (
              <TableRow key={header.id}>
                <TableCell className="font-medium">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>

                {rows.map((row) => {
                  const cell = row
                    .getVisibleCells()
                    .find((cell) => cell.column.id === header.id);
                  return (
                    <TableCell key={row.id + header.id}>
                      {cell
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
