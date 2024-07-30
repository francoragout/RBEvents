"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface ButtonSocialProps {
  children: React.ReactNode;
  provider: string;
}

const ButtonSocial = ({ children, provider }: ButtonSocialProps) => {
  const handleClick = async () => {
    await signIn(provider);
  };

  return <Button onClick={handleClick} className="w-full mt-4" variant="outline">{children}</Button>;
};
export default ButtonSocial;