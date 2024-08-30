import Dashboard from "@/components/admin/dashboard/dashboard";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const events = await db.event.findMany();

  return (
    <div>
      <Dashboard events={events}/>
    </div>
  );
}
