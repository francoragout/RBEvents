import Dashboard from "@/components/admin/dashboard";
import LogoutButton from "@/components/admin/logout-button";

export default async function AdminPage() {
  return (
    <div className="container">
      <LogoutButton />
      <Dashboard />
    </div>
  );
}
