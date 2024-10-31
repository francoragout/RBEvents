"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Icons } from "../icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { MagicLinks } from "@/actions/authentication";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Requerido",
    })
    .email({ message: "Correo electrónico inválido" }),
});

export function UserAuthForm() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null);
    setSuccessMessage(null);
    startTransition(() => {
      MagicLinks(values.email).then((response) => {
        if (response.success) {
          signIn("resend", { email: values.email, redirect: false });
          setSuccessMessage(response.message);
        } else {
          setErrorMessage(response.message);
        }
      });
    });
  }

  return (
    <div className="grid gap-6">
      {successMessage ? (
        <Alert className={cn("text-green-600 border-green-600 text-center")}>
          <AlertTitle>{successMessage}</AlertTitle>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <Input
                          placeholder="nombre@ejemplo.com"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Iniciar sesión
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continúe con
          </span>
        </div>
      </div>

      <Button
        onClick={() => signIn("google")}
        variant="outline"
        type="button"
        disabled={isPending}
      >
        <FcGoogle className="h-5 w-5 me-2" />
        Google
      </Button>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aviso</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
