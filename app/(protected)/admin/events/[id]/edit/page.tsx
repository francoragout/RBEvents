import { db } from "@/lib/db";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const event = await db.event.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div>
        <h1>{event?.name}</h1>
    </div>
  );
}
