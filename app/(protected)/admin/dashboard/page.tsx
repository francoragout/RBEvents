import Dashboard from "@/components/admin/dashboard/dashboard";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const events = await db.event.findMany();
  const meetings = await db.meeting.findMany({
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div>
      <Dashboard events={events} meetings={meetings}/>
    </div>
  );
}
