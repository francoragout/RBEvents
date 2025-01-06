"use client";

import {
  DollarSign,
  Info,
  ListTodo,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { EventSchema } from "@/lib/validations";
import { useSession } from "next-auth/react";

type Event = z.infer<typeof EventSchema>;

export default function SubNavbar({ event }: { event: Event }) {
  const path = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  let title = (
    <div>
      <Info className="flex sm:hidden ms-1" />
      <span className="hidden sm:flex">Información</span>
    </div>
  );

  if (path.endsWith("/tasks") || path.endsWith("/board")) {
    title = (
      <div>
        <ListTodo className="flex sm:hidden ms-1" />
        <span className="hidden sm:flex">Tareas</span>
      </div>
    );
  } else if (path.endsWith("/guests")) {
    title = (
      <div>
        <Users className="flex sm:hidden ms-1" />
        <span className="hidden sm:flex">Invitados</span>
      </div>
    );
  } else if (path.endsWith("/budget")) {
    title = (
      <div>
        <DollarSign className="flex sm:hidden ms-1" />
        <span className="hidden sm:flex">Presupuesto</span>
      </div>
    );
  }

  if (!path.endsWith("/edit")) {
    return (
      <div className="flex items-center mb-4 justify-between">
        <Badge variant="outline">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center">
            {event?.name}:<div className="text-primary ml-1">{title}</div>
          </h4>
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col">
              <Button
                asChild
                variant={path.endsWith("/information") ? "secondary" : "ghost"}
                className="flex justify-start pl-2"
                size="sm"
              >
                <Link
                  href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                    event?.id
                  }/information`}
                >
                  <Info className="mr-2 h-4 w-4" />
                  <span>Información</span>
                </Link>
              </Button>

              <Button
                asChild
                variant={path.endsWith("/budget") ? "secondary" : "ghost"}
                className="flex justify-start pl-2"
                size="sm"
              >
                <Link
                  href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                    event?.id
                  }/budget`}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Presupuesto</span>
                </Link>
              </Button>

              <Button
                asChild
                variant={path.endsWith("/guests") ? "secondary" : "ghost"}
                className="flex justify-start pl-2"
                size="sm"
              >
                <Link
                  href={`/${role === "ADMIN" ? "admin" : "client"}/events/${
                    event?.id
                  }/guests`}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Invitados</span>
                </Link>
              </Button>

              {role === "ADMIN" && (
                <Button
                  asChild
                  variant={path.endsWith("/tasks") ? "secondary" : "ghost"}
                  className="flex justify-start pl-2"
                  size="sm"
                >
                  <Link href={`/admin/events/${event?.id}/tasks`}>
                    <ListTodo className="mr-2 h-4 w-4" />
                    <span>Tareas</span>
                  </Link>
                </Button>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
