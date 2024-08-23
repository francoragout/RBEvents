import EventCreateForm from "@/components/admin/events/event-create-form";
import { db } from "@/lib/db";

export default async function CreateEventPage() {
  const providers = await db.provider.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  console.log(providers);

  return <EventCreateForm providers={providers} />;
}
