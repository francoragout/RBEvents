import { auth } from "@/auth";
import { EventsColumns } from "@/components/admin/events/events-columns";
import { EventsTable } from "@/components/admin/events/events-table";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { SessionProvider } from "next-auth/react";

import { redirect } from "next/navigation";
import { z } from "zod";

type Event = z.infer<typeof EventSchema>;

async function getData(session: any): Promise<Event[]> {
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const events = await db.event.findMany({
    where: {
      userId: user.id,
    },
    include: {
      provider: {
        select: {
          name: true,
          city: true,
        },
      },
      task: true,
      budget: true,
      guest: true,
    },
  });
  return events.map((event) => EventSchema.parse(event));
}

export default async function EventsPage() {
  const session = await auth();
  const data = await getData(session);

  return (
    <SessionProvider session={session}>
      <EventsTable columns={EventsColumns} data={data} />
    </SessionProvider>
  );
}
