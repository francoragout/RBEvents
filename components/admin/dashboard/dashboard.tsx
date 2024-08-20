import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartMultiple } from "./bar-chart-multiple";
import {
  Activity,
  BarChart,
  Calendar,
  DollarSign,
  PartyPopper,
  PieChart,
} from "lucide-react";
import { db } from "@/lib/db";

export default async function Dashboard() {
  const events = await db.event.findMany({
    include: {
      tasks: true,
    },
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const events_this_month = events.filter((event) => {
    const date = new Date(event.date);
    return date >= firstDay && date <= lastDay;
  }).length;

  const months_with_events = new Set(
    events.map((event) => new Date(event.date).getMonth() + 1)
  ).size;

  const upcoming_events = events.filter((event) => {
    const date = new Date(event.date);
    return date >= today;
  }).length;

  const events_this_year = events.filter((event) => {
    const date = new Date(event.date);
    return date.getFullYear() === today.getFullYear();
  }).length;

  const average_events_per_month = events_this_year / months_with_events;

  const difference_from_avg =
    (events_this_month - average_events_per_month) * 100;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Events This Month
            </CardTitle>

            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1" color="hsl(var(--chart-1))">{events_this_month}</div>
            {difference_from_avg >= average_events_per_month ? (
              <p className="text-xs">
                +{difference_from_avg.toFixed(2)}% from average
              </p>
            ) : (
              <p className="text-xs">
                {difference_from_avg.toFixed(2)}% from average
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Income This Month
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">$ {}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{upcoming_events}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Events This Year
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{events_this_year}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-8">
        <BarChartMultiple events={events} avg={average_events_per_month} />
      </div>
    </div>
  );
}

// const income_this_month = events.reduce((sum, event) => {
//   const date = new Date(event.date);
//   return date >= firstDay && date <= lastDay
//     ? sum + (event.income ?? 0)
//     : sum;
// }, 0);
