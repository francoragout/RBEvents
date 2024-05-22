import { ModeToggle } from "../theme-toggle-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaceIcon, PersonIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">RBEvents</h1>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <PersonIcon />
              {/* <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              /> */}
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
}
