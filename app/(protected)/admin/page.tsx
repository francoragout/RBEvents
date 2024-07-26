import { auth } from "@/auth";
import Dashboard from "@/components/admin/dashboard";
import LogoutButton from "@/components/admin/logout-button";

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return <div>You are not admin</div>;
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
      <Dashboard />
    </div>
  );
}
