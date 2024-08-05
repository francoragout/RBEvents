"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import LogoutButton from "./auth/logout-button";
import { LogIn } from "lucide-react";

const clientLinks = [{ name: "Dashboard", href: "/client/dashboard" }];

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Events", href: "/admin/events" },
  { name: "Providers", href: "/admin/providers" },
];

export default function Navbar({ session }: { session: any }) {
  const pathname = usePathname();
  const links = session?.user?.role === "ADMIN" ? adminLinks : clientLinks;

  const activeLink = links.find((link) => pathname.startsWith(link.href));

  console.log(activeLink);

  return (
    <nav className="flex items-center justify-between py-2 px-8">
      <div className="flex space-x-8 items-center">
        <h1 className="text-2xl font-bold">RBEvents</h1>
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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex sm:hidden" asChild>
              <Button variant="outline" className="rounded-full">
                {activeLink?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {links.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                <AvatarFallback className="bg-white">
                  <PersonIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuLabel>
                  {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <LogoutButton />
              </>
            ) : (
              <>
                <DropdownMenuLabel>
                  Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  className="flex justify-start pl-2 w-full"
                  size="sm"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <Link href="/login">
                    <span>Sign In</span>
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
