import { Navbar } from "@/components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <main className="container p-4">
      <Navbar />
      {children}
    </main>
   );
}
 
export default ProtectedLayout;