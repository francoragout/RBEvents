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
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
        Estamos trabajando en esta página 🚧
      </h2>
    </div>
  );
}
