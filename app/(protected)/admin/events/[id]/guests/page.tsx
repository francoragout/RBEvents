import { GuestsColumns } from "@/components/admin/events/guests/guests-columns";
import { GuestsTable } from "@/components/admin/events/guests/guests-table";
import { invitations } from "@/lib/data";
import { db } from "@/lib/db";
import { GuestSchema } from "@/lib/validations";
import { z } from "zod";

type Guest = z.infer<typeof GuestSchema>;

async function getData(eventId: string): Promise<Guest[]> {
  const guests = await db.guest.findMany({
    where: {
      eventId: eventId,
    },
    orderBy: [
      {
        invitation: "asc",
      },
      {
        last_name: "asc",
      },
    ],
  });

  return guests.map((guest) => GuestSchema.parse(guest));
}

function getInvitationLabel(value: string): string {
  const invitation = invitations.find((inv) => inv.value === value);
  return invitation ? invitation.label : value;
}

export default async function GuestsPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await db.event.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
    },
  });
  const eventName = event?.name ?? "Evento";
  const eventId = params.id;
  const guests = await getData(eventId);
  const guestList = guests.map((guest) => {
    return {
      Apellido: guest.last_name,
      Nombre: guest.first_name,
      Invitación: getInvitationLabel(guest.invitation),
      "Numero de mesa": guest.table_number,
    };
  });
  return (
    <div className="h-full flex-col">
      <GuestsTable
        data={guests}
        columns={GuestsColumns}
        eventId={eventId}
        guestList={guestList}
        eventName={eventName}
      />
    </div>
  );
}
