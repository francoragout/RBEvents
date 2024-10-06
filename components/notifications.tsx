"use client";

import { DotIcon } from "lucide-react";
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

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { resetState } from "@/lib/features/notifications/CounterSlice";
import { useDispatch } from "react-redux";
import { Icons } from "./icons";
import clsx from "clsx";
import { ScrollArea } from "./ui/scroll-area";
import { read } from "fs";

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
          <Badge
            className={clsx(
              "absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full",
              resultNotifications > 0 ? "bg-primary" : "bg-secondary"
            )}
          >
            {resultNotifications}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-between items-center">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <Button
            size="sm"
            className="h-6 me-2 rounded-full border-primary"
            onClick={handleMarkAsRead}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Mark all as read
          </Button>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-96">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-1">
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
                  <AlertTitle>{notification.title}</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    Created {notification.createdAt.toLocaleDateString()} at{" "}
                    {notification.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </AlertDescription>
                </div>
              </Alert>
            </DropdownMenuItem>
          ))}

        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
