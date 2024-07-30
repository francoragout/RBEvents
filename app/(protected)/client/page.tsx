import { auth } from "@/auth";
import LogoutButton from "@/components/admin/logout-button";

export default async function ClientPage() {
  const session = await auth();

  if (session?.user?.role !== "USER") {
    return <div>You are not user</div>;
  }

  return (
    <div>
      <h1>Client Page</h1>
      <p>This page is only visible to authenticated users.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
}
