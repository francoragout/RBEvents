"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/auth/login",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="flex justify-start pl-2"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};
export default LogoutButton;
