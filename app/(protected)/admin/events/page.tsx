import { EventsColumnsTable } from "@/components/admin/events-columns-table";
import { EventsTable } from "@/components/admin/events-table";
import { db } from "@/lib/db";
import { EventSchema } from "@/lib/validations";
import { useState } from "react";
import { z } from "zod";

// Extend the existing EventSchema to include the id field
const ExtendedEventSchema = EventSchema.extend({
  id: z.string(), // Assuming the id field is a string in your database
});

type Event = z.infer<typeof ExtendedEventSchema>;

async function getData(): Promise<Event[]> {
  const events = await db.event.findMany();
  return events.map((event) => ExtendedEventSchema.parse(event));
}

export default async function EventsPage() {
  const data = await getData();
  return <EventsTable columns={EventsColumnsTable} data={data} />;
}
