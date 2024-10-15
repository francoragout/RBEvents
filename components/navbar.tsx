"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogIn } from "lucide-react";
import UserSignOut from "./auth/user-signout";
import Notifications from "./notifications";
import { z } from "zod";
import { NotificationSchema } from "@/lib/validations";
import Image from "next/image";

const clientLinks = [{ name: "Events", href: "/client/events" }];

const adminLinks = [
  { name: "Panel", href: "/admin/dashboard" },
  { name: "Eventos", href: "/admin/events" },
  { name: "Salónes", href: "/admin/providers" },
  { name: "Ingresos", href: "/admin/incomes" },
  { name: "Usuarios", href: "/admin/users" },
];

type Notification = z.infer<typeof NotificationSchema>;

interface NavbarProps {
  session: any;
  notifications: Notification[];
}

export default function Navbar({ session, notifications }: NavbarProps) {
  const pathname = usePathname();
  const links = session?.user?.role === "ADMIN" ? adminLinks : clientLinks;
  const activeLink = links.find((link) => pathname.startsWith(link.href));

  return (
    <nav className="flex items-center justify-between py-2 px-8">
      <div className="flex space-x-8 items-center">
        <Button variant="outline" className="rounded-full" size="icon">
          <Image
            className="dark:invert dark:brightness-0"
            src="/RBEventos.svg"
            width={40}
            height={40}
            alt="Logo of the app"
          />
        </Button>

        {session && (
          <Tabs value={activeLink?.href}>
            <TabsList className="hidden sm:flex">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <TabsTrigger value={link.href}>{link.name}</TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="flex space-x-4">
        {session && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex sm:hidden" asChild>
                <Button variant="outline" className="rounded-full">
                  {activeLink?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="flex justify-start pl-2"
                    size="sm"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {session?.user?.role === "ADMIN" && (
          <Notifications notifications={notifications} />
        )}

        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                {session?.user?.image ? (
                  <AvatarImage src={session?.user?.image} alt="avatar" />
                ) : null}
                <AvatarFallback className="bg-background">
                  <PersonIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <UserSignOut />
              </>
            ) : (
              <>
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="flex justify-start pl-2 w-full"
                  size="sm"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <Link href="/authentication">
                    <span>Iniciar sesión</span>
                  </Link>
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
