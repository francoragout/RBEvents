"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"


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

const chartData = [
  { month: "January", events: 4, income: 300 },
  { month: "February", events: 3, income: 200 },
  { month: "March", events: 2, income: 300 },
  { month: "April", events: 5, income: 400 },
  { month: "May", events: 6, income: 500 },
  { month: "June", events: 7, income: 600 },
  { month: "July", events: 6, income: 700 },
  { month: "August", events: 1, income: 800 },
  { month: "September", events: 1, income: 100 },
  { month: "October", events: 2, income: 100 },
  { month: "November", events: 8, income: 800 },
  { month: "December", events: 5, income: 500 },
  
];

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

export function BarChartMultiple() {
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
            />
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
              yAxisId="right"
            />
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
