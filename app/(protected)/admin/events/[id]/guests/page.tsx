import GuestCreateForm from "@/components/admin/events/guests/guest-create-form";
import { GuestsColumns } from "@/components/admin/events/guests/guests-columns";
import { GuestsTable } from "@/components/admin/events/guests/guests-table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { GuestSchema } from "@/lib/validations";
import { z } from "zod";

type Guest = z.infer<typeof GuestSchema>;

async function getData(eventId: string): Promise<Guest[]> {
  const guests = await db.guest.findMany({
    where: {
      eventId: eventId,
    },
  });

  return guests.map((guest) => GuestSchema.parse(guest));
}

export default async function GuestsPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;
  const guests = await getData(eventId);
  return (
    <div className="h-full flex-col space-y-12">
      <GuestCreateForm eventId={eventId}/>
      <GuestsTable data={guests} columns={GuestsColumns} />
    </div>
  );
}
