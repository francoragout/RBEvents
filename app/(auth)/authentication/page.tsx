import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex  justify-center items-center">
            <Image
              src="/RBEventos.svg"
              alt="Logo of the app"
              width={600}
              height={600}
              className="invert brightness-0"
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Esta increíble aplicación te permitirá gestionar la
                información, presupuesto e invitados de tu proximo
                evento.&rdquo;
              </p>
              <footer className="text-sm">Ana & Belen</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crear una cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Introduce tu correo electrónico a continuación para crear tu
                cuenta
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Al hacer clic en continuar, acepta nuestros{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Términos de servicio
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
