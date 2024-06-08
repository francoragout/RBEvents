import { db } from "@/lib/db";

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-5">
      {event?.name}
    </h1>
  );
}
