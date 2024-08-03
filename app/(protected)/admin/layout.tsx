import { auth } from "@/auth";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN") {
    return <div>You are not admin</div>;
  }

  return (
    <main>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      
      {children}
    </main>
  );
};

export default ProtectedLayout;
