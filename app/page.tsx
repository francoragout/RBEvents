import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const lastClientEvent = await db.event.findFirst({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  } else if (session?.user?.role === "USER") {
    redirect(`/client/events/${lastClientEvent?.id}/overview`);
  }

  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-center">
        Estamos trabajando en esta página 🚧
      </h2>
    </div>
  );
}
