import { auth } from "@/auth";
import { EventsColumns } from "@/components/admin/events/events-columns";
import { EventsTable } from "@/components/admin/events/events-table";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { SessionProvider } from "next-auth/react";
import { z } from "zod";

type Event = z.infer<typeof EventSchema>;

async function getData(): Promise<Event[]> {
  const events = await db.event.findMany({
    where: {
      archived: true,
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

export default async function ArchivedPage() {
  const data = await getData();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <EventsTable columns={EventsColumns} data={data} />
    </SessionProvider>
  );
}
