"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme-toggle-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, PersonIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const Navbar = () => {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">RBEvents</h1>
      <Tabs defaultValue={path}>
        <TabsList className="">
          <Link href="/admin">
            <TabsTrigger value="/admin" className="">
              Dashboard
            </TabsTrigger>
          </Link>
          <Link href="/admin/events">
            <TabsTrigger value="/admin/events">Events</TabsTrigger>
          </Link>
          <Link href="/admin/providers">
            <TabsTrigger value="/admin/providers">Providers</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      <div className="flex items-center space-x-4">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <PersonIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
