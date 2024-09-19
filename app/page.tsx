import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  } else if (session?.user?.role === "USER") {
    redirect("/client/events");
  }

  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
