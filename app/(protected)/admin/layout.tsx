import { auth } from "@/auth";
import LogoutButton from "@/components/admin/logout-button";
import { Navbar } from "@/components/admin/navbar";
import { Separator } from "@/components/ui/separator";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return <div>You are not admin</div>;
  }

  return (
    <main className="container p-4">
      <Navbar />
      <Separator className="mb-4" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
      {children}
    </main>
  );
};

export default ProtectedLayout;
