import { EventsColumnsTable } from "@/components/admin/events-columns-table";
import { EventsTable } from "@/components/admin/events-table";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";


type Event = z.infer<typeof EventSchema>;

async function getData(): Promise<Event[]> {
  const events = await db.event.findMany({
    where: {
      archived: false,
    },
    include: {
      tasks: true,
    },
  })
    
  return events.map((event) => EventSchema.parse(event));
}

export default async function EventsPage() {
  const data = await getData();
  return <EventsTable columns={EventsColumnsTable} data={data} />;
}
