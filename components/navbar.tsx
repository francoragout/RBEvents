"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Auth", href: "/auth/login" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between py-2 px-4">
      <h1 className="text-2xl font-bold">RBEvents</h1>

      <Tabs>
        <TabsList defaultValue={pathname}>
          {links.map((link) => (
            <TabsTrigger key={link.href} value={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ModeToggle />
    </nav>
  );
}
