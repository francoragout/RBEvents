"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";

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
          <Button size="sm" className="h-8 flex" asChild>
            <Link href="/admin/events/create">
              <PlusCircle className="flex sm:hidden h-4 w-4"/>
              <span className="hidden sm:flex">Nuevo Evento</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
