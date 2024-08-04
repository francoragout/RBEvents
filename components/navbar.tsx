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

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Auth", href: "/auth/login" },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Events", href: "/admin/events" },
  { name: "Providers", href: "/admin/providers" },
];

export default function Navbar({ session }: { session: any }) {
  const pathname = usePathname();
  const links = session?.user?.role === "ADMIN" ? adminLinks : publicLinks;

  const activeLink = links.find((link) => pathname.startsWith(link.href));

  return (
    <nav className="flex items-center justify-between py-2 px-8">
      <div className="flex space-x-8 items-center">
        <h1 className="text-2xl font-bold">RBEvents</h1>

        <Tabs value={activeLink?.href}>
          <TabsList className="hidden sm:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <TabsTrigger value={link.href}>{link.name}</TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex space-x-4">
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <LogoutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
