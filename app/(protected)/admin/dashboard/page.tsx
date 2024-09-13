import { DashboardBarChart } from "@/components/admin/dashboard/dashboard-bar-chart";
import DashboardCalendar from "@/components/admin/dashboard/dashboard-calendar";
import DashboardTable from "@/components/admin/dashboard/dashboard-table";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const events = await db.event.findMany();

  const today = new Date();

  await db.meeting.deleteMany({
    where: {
      date: {
        lt: today,
      },
    },
  });

  const meetings = await db.meeting.findMany({
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-8 lg:gap-4">
      <DashboardCalendar meetings={meetings} events={events}/>
      <DashboardTable meetings={meetings} />
      <DashboardBarChart events={events} />
    </div>
  );
}
