import { auth } from "@/auth";

import { redirect } from "next/navigation";
export default async function ClientPage() {
  const session = await auth();

  if (session?.user?.role !== "USER") {
    redirect("/admin/dashboard");
  }

  return (
    <div>
      <h1>Client Page</h1>
      <p>This page is only visible to authenticated users.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
     
    </div>
  );
}
