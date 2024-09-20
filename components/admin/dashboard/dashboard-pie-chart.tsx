"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EventSchema } from "@/lib/validations";
import { z } from "zod";

type Event = z.infer<typeof EventSchema>;

const chartConfig = {
  events: {
    label: "Events",
  },
  coordination: {
    label: "Coordination",
    color: "hsl(var(--chart-1))",
  },
  partial: {
    label: "Partial",
    color: "hsl(var(--chart-2))",
  },
  comprehensive: {
    label: "Comprehensive",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function DashboardPieChart({ events }: { events: Event[] }) {
  const totalEvents = events.length;
  const chartData = [
    {
      event: "coordination",
      count: events.filter((event) => event.organization === "COORDINATION")
        .length,
      fill: "hsl(var(--chart-1))",
    },
    {
      event: "partial",
      count: events.filter((event) => event.organization === "PARTIAL").length,
      fill: "hsl(var(--chart-2))",
    },
    {
      event: "comprehensive",
      count: events.filter((event) => event.organization === "COMPREHENSIVE")
        .length,
      fill: "hsl(var(--chart-3))",
    },
  ];

  return (
    <Card className="col-span-1 md:col-span-5 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Organizations</CardTitle>
        <CardDescription>Types by RBE</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="event"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEvents}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          All events
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="event" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
