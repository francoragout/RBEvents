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
import { useState } from "react";

type Notification = z.infer<typeof NotificationSchema>;

export default function Notifications({
  notifications,
}: {
  notifications: Notification[];
}) {
  console.log(notifications);

  const [notReadNotifications, setNotReadNotifications] = useState(
    notifications.filter((notification) => !notification.read)
  );
  const [readNotifications, setReadNotifications] = useState(
    notifications.filter((notification) => notification.read)
  );

  const handleMarkAsRead = async () => {
    const result = await MarkNotificationsAsRead();
    if (result.success) {
      setReadNotifications([...readNotifications, ...notReadNotifications]);
      setNotReadNotifications([]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <BellIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          {notReadNotifications.length > 0 ? (
            <Badge className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full">
              {notReadNotifications.length}
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full"
            >
              {notReadNotifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-between items-center">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <Button
            size="sm"
            variant="outline"
            onClick={handleMarkAsRead}
            className="h-6 me-2 rounded-full border-primary"
          >
            Mark all as read
          </Button>
        </div>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            <Alert className="flex">
              <div className="items-center">
                <DotIcon
                  className={`h-10 w-10 ${
                    readNotifications.includes(notification)
                      ? "text-foreground"
                      : "text-primary"
                  }`}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}