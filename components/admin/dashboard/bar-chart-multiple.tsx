"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  Rectangle,
} from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { z } from "zod";
import { EventSchema } from "@/lib/validations";

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Event = z.infer<typeof EventSchema>;

export function BarChartMultiple({ events }: { events: Event[] }) {
  const currentYear = new Date().getFullYear();
  const eventsPerMonth = Array(12).fill(0);
  const incomePerMonth = Array(12).fill(0);

  events.forEach((event) => {
    const date = new Date(event.date);
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth();
      eventsPerMonth[month]++;
      incomePerMonth[month] += event.income ?? 0;
    }
  });

  console.log(incomePerMonth);

  const chartData = [
    { month: "January", events: eventsPerMonth[0], income: incomePerMonth[0] },
    { month: "February", events: eventsPerMonth[1], income: incomePerMonth[1] },
    { month: "March", events: eventsPerMonth[2], income: incomePerMonth[2] },
    { month: "April", events: eventsPerMonth[3], income: incomePerMonth[3] },
    { month: "May", events: eventsPerMonth[4], income: incomePerMonth[4] },
    { month: "June", events: eventsPerMonth[5], income: incomePerMonth[5] },
    { month: "July", events: eventsPerMonth[6], income: incomePerMonth[6] },
    { month: "August", events: eventsPerMonth[7], income: incomePerMonth[7] },
    { month: "September", events: eventsPerMonth[8], income: incomePerMonth[8] },
    { month: "October", events: eventsPerMonth[9], income: incomePerMonth[9] },
    { month: "November", events: eventsPerMonth[10], income: incomePerMonth[10] },
    { month: "December", events: eventsPerMonth[11], income: incomePerMonth[11] },
  ];

  const averageEvents =
    chartData.reduce((sum, item) => sum + item.events, 0) / chartData.length;
  const averageIncome =
    chartData.reduce((sum, item) => sum + item.income, 0) / chartData.length;

  console.log(eventsPerMonth);

  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="events"
              fill="var(--color-events)"
              radius={4}
              yAxisId="left"
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={1} />}
            />
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
              yAxisId="right"
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={1} />}
            />
            <ReferenceLine
              y={averageEvents}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
              yAxisId="left"
            >
              <Label
                position="insideBottomLeft"
                value="Avg Events"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={averageEvents.toFixed(2)}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
            <ReferenceLine
              y={averageIncome}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
              yAxisId="right"
            >
              <Label
                position="insideBottomRight"
                value="Avg Income"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopRight"
                value={averageIncome.toFixed(2)}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
