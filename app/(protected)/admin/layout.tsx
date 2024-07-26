import { auth } from "@/auth";
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
      <Separator className="mb-4"/>
      {children}
    </main>
  );
};

export default ProtectedLayout;
