import EventEditForm from "@/components/admin/events/event-edit-form";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const providers = await db.provider.findMany({
    select: {
      id: true,
      name: true,
      city: true,
    },
  });

  const id = params.id;
  const event = await db.event.findUnique({
    where: {
      id: id,
    },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },
  });

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <SessionProvider>
      <EventEditForm event={event} providers={providers} />
    </SessionProvider>
  );
}
