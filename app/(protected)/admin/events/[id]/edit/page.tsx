import EventEditForm from "@/components/admin/events/event-edit-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const providers = await db.provider.findMany();
  
  const id = params.id;
  const event = await db.event.findUnique({
    where: {
      id: id,
    },
    include: {
      tasks: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
      <div>
        <EventEditForm event={{ ...event, budget: [] }} providers={providers}/>
      </div>
    );
}
