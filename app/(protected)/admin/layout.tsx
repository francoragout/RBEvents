import { Navbar } from "@/components/admin/navbar";
import { Separator } from "@/components/ui/separator";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main className="container p-4">
      <Navbar />
      <Separator className="mb-4"/>
      {children}
    </main>
  );
};

export default ProtectedLayout;
