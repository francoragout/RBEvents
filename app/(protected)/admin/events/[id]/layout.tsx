import { db } from "@/lib/db";
import {
  DollarSign,
  EyeIcon,
  ListTodo,
  MoreHorizontal,
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
interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const EventLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main>
      <div className="flex items-center space-x-4 mb-4 justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {event?.name}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event?.id}/overview`}>
                  <EyeIcon className="mr-2 h-4 w-4" />
                  <span>Overview</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event?.id}/tasks`}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  <span>Tasks</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="flex justify-start pl-2"
              >
                <Link href={`/admin/events/${event?.id}/budget`}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Budget</span>
                </Link>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </main>
  );
};

export default EventLayout;
