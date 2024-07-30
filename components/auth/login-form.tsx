"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/actions/auth";
import ButtonSocial from "./button-social";

interface LoginFormProps {
  isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}

export default function LoginForm({
  isVerified,
  OAuthAccountNotLinked,
}: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError(null);
    startTransition(() => {
      LoginUser(values).then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          
        }
      });
    });
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isVerified && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 rounded-lg">
            <p className="text-green-700 text-sm">
              Your email has been verified. You can now login to your account.
            </p>
          </div>
        )}
        {OAuthAccountNotLinked && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded-lg">
            <p className="text-yellow-700 text-sm">
              Your email is already registered. Please login with your email and
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && <FormMessage>{error}</FormMessage>}

              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </div>
          </form>
        </Form>
        <ButtonSocial provider="google">
          <FcGoogle className="h-5 w-5 me-2" />
          Sign In with Google
        </ButtonSocial>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
