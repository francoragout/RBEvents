import { InformationColumns } from "@/components/admin/events/information/information-columns";
import { InformationTable } from "@/components/admin/events/information/information-table";
import { db } from "@/lib/db";
import { InformationSchema } from "@/lib/validations";
import { z } from "zod";

type Information = z.infer<typeof InformationSchema>;

async function getData(eventId: string): Promise<Information[]> {
  const information = await db.information.findMany({
    where: {
      eventId: eventId,
    },
  });

  return information.map((information) => InformationSchema.parse(information));
}

export default async function InfoPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = params.id;
  const information = await getData(eventId);
  return (
    <div className="h-full flex-col">
      <InformationTable data={information} columns={InformationColumns} eventId={eventId} />
    </div>
  );
}
