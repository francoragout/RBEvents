import Overview from "@/components/client/overview";
import { db } from "@/lib/db";

export default async function OverviewPage({
  params,
}: {
  params: { id: string };
}) {
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
      guest: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          table_number: true,
          invitation: true,
        },
      },
      budget: {
        select: {
          id: true,
          category: true,
          total_price: true,
        },
      },
    },
  });

  if (!event) {
    return <div>Event not found</div>;
  }

  return <Overview event={event} />;
}
