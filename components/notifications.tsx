"use client";

import { DotIcon, EyeIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";
import { z } from "zod";
import { NotificationSchema } from "@/lib/validations";
import { MarkNotificationsAsRead } from "@/actions/notification";
import React, { useState, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { resetState } from "@/lib/features/notifications/CounterSlice";
import { useDispatch } from "react-redux";
import { Icons } from "./icons";
import clsx from "clsx";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { es } from 'date-fns/locale';

type Notification = z.infer<typeof NotificationSchema>;

export default function Notifications({
  notifications,
}: {
  notifications: Notification[];
}) {
  const countState = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  const [notReadNotifications, setNotReadNotifications] = useState(
    notifications.filter((notification) => !notification.read)
  );

  const resultNotifications = countState + notReadNotifications.length;

  const [isPending, startTransition] = useTransition();

  function handleMarkAsRead() {
    startTransition(() => {
      MarkNotificationsAsRead().then((response) => {
        if (response.success) {
          dispatch(resetState());
          setNotReadNotifications([]);
          notifications.forEach((notification) => {
            notification.read = true;
          });
        }
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <BellIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          <Badge className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full">
            {resultNotifications}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-between items-center space-x-4">
          <DropdownMenuLabel>Notificaciónes</DropdownMenuLabel>
          <Button
            size="sm"
            className="h-6 me-2 rounded-full border-primary"
            onClick={handleMarkAsRead}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <EyeIcon className="h-4 w-4"/>
          </Button>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-96">
          {notifications.length === 0 && (
            <DropdownMenuItem className="flex justify-center">
              Sin resultados.
            </DropdownMenuItem>
          )}
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-1">
              <Link href={notification.link} className="w-full">
                <Alert className="flex">
                  <div className="items-center">
                    <DotIcon
                      className={clsx(
                        "h-10 w-10",
                        notification.read ? "text-foreground" : "text-primary"
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <AlertTitle>{notification.message}</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </AlertDescription>
                  </div>
                </Alert>
              </Link>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
