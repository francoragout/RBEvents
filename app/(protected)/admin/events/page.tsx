import { EventsColumnsTable } from "@/components/admin/events-columns-table";
import { EventsTable } from "@/components/admin/events-table";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";

// Extend the existing EventSchema to include the id field

type Event = z.infer<typeof EventSchema>;

async function getData(): Promise<Event[]> {
  const events = await db.event.findMany({
    where: {
      archived: false,
    }
  })
    
  return events.map((event) => EventSchema.parse(event));
}

export default async function EventsPage() {
  const data = await getData();
  return <EventsTable columns={EventsColumnsTable} data={data} />;
}
