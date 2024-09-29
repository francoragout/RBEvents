import { DashboardBarChart } from "@/components/admin/dashboard/dashboard-bar-chart";
import DashboardCalendar from "@/components/admin/dashboard/dashboard-calendar";
import { DashboardLineChart } from "@/components/admin/dashboard/dashboard-line-chart";
import { DashboardPieChart } from "@/components/admin/dashboard/dashboard-pie-chart";
import DashboardTable from "@/components/admin/dashboard/dashboard-table";
import { TableSkeleton } from "@/components/skeletons";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Suspense } from "react";

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
    <Suspense fallback={<TableSkeleton/>}>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-4 lg:grid-cols-8 lg:gap-4">
        <DashboardCalendar meetings={meetings} events={events} />
        <DashboardTable meetings={meetings} />
        <DashboardBarChart events={events} />
        {/* <DashboardPieChart events={events} />
        <Card className="lg:col-span-6"></Card> */}
        <DashboardLineChart />
        <DashboardPieChart events={events} />
      </div>
    </Suspense>
  );
}
