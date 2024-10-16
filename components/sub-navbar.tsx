"use client";

import {
  DollarSign,
  EyeIcon,
  ListTodo,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { EventSchema } from "@/lib/validations";
import { useSession } from "next-auth/react";

type Event = z.infer<typeof EventSchema>;

export default function SubNavbar({ event }: { event: Event }) {
  
  const path = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  let title = "Información";
  if (path.endsWith("/tasks")) {
    title = "Tareas";
  } else if (path.endsWith("/guests")) {
    title = "Invitados";
  } else if (path.endsWith("/budget")) {
    title = "Presupuesto";
  }

  return (
    <div className="flex items-center mb-4 justify-between">
      <Badge variant="outline">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex">
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
                <EyeIcon className="mr-2 h-4 w-4" />
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
function endsWith(arg0: string) {
  throw new Error("Function not implemented.");
}
