"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function EventsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar eventos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      {role === "ADMIN" && (
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm" className="h-8" asChild>
            <Link
              href={
                pathname === "/admin/events/archived"
                  ? "/admin/events"
                  : "/admin/events/archived"
              }
            >
              {pathname === "/admin/events/archived"
                ? "En curso"
                : "Archivados"}
            </Link>
          </Button>
          <Button size="sm" className="h-8" asChild>
            <Link href="/admin/events/create">Nuevo Evento</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
