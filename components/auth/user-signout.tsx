"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const UserSignOut = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/auth/authentication",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="flex justify-start pl-2 w-full"
      size="sm"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>SignOut</span>
    </Button>
  );
};
export default UserSignOut;
