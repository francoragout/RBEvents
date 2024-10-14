import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import StoreProvider from "./StoreProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RB - Events",
  description: "Generated by Franco Ragout",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const notifications = await db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar session={session} notifications={notifications} />
            <Separator className="mb-14" />
            <div className="container mb-14">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
