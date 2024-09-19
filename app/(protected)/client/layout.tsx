import { auth } from "@/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedClientLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  if (session?.user?.role !== "USER") {
    return <div>You are not user</div>;
  }

  return <main>{children}</main>;
};

export default ProtectedClientLayout;
