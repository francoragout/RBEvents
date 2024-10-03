"use client";

import { DotIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
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
  const [notReadNotifications, setNotReadNotifications] = useState(
    notifications.filter((notification) => !notification.read)
  );

  const handleMarkAsRead = async () => {
    const result = await MarkNotificationsAsRead();
    if (result.success) {
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
          {notReadNotifications.length > 0 && (
            <Badge className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full">
              {notReadNotifications.length}
            </Badge>
          )}

          <Badge
            variant="secondary"
            className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full"
          >
            {notReadNotifications.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <Button onClick={handleMarkAsRead}>Mark all as read</Button>
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            <Alert className="flex">
              <div className="items-center">
                <DotIcon className="h-10 w-10 text-primary" />
              </div>
              <div className="flex flex-col">
                <AlertTitle>{notification.title}</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  {`Created ${notification.date.toLocaleDateString()} at ${notification.date.toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}`}
                </AlertDescription>
              </div>
            </Alert>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
