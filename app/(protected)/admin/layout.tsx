import { Navbar } from "@/components/admin/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main className="container p-4">
      <div className="mb-6">
        <Navbar />
      </div>
      {children}
    </main>
  );
};

export default ProtectedLayout;
