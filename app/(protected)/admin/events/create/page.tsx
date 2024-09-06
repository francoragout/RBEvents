import EventCreateForm from "@/components/admin/events/event-create-form";
import { db } from "@/lib/db";

export default async function CreateEventPage() {
  const providers = await db.provider.findMany({
    select: {
      id: true,
      name: true,
      city: true,
    },
  });

  return <EventCreateForm providers={providers} />;
}
