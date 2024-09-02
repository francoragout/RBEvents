import { auth } from "@/auth";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedAdminLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN") {
    return <div>You are not admin</div>;
  }

  return (
    <main>
      {children}
    </main>
  );
};

export default ProtectedAdminLayout;
