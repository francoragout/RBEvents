"use client";

import * as React from "react";
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
  },
  partial: {
    label: "Partial",
  },
  comprehensive: {
    label: "Comprehensive",
  },
} satisfies ChartConfig;

export function DashboardPieChart({ events }: { events: Event[] }) {
  const totalEvents = events.length;

  const coordinationCount = events.filter(
    (event) => event.organization === "COORDINATION"
  ).length;
  const partialCount = events.filter(
    (event) => event.organization === "PARTIAL"
  ).length;
  const comprehensiveCount = events.filter(
    (event) => event.organization === "COMPREHENSIVE"
  ).length;

  const counts = [
    { organization: "coordination", count: coordinationCount },
    { organization: "partial", count: partialCount },
    { organization: "comprehensive", count: comprehensiveCount },
  ];

  counts.sort((a, b) => b.count - a.count);

  const chartData = counts.map((item, index) => {
    let color;
    if (index === 0) {
      color = "hsl(var(--primary))";
    } else if (index === 1) {
      color = "hsl(var(--primary) / 0.6)";
    } else {
      color = "hsl(var(--primary) / 0.2)";
    }
    return {
      event: item.organization,
      count: item.count,
      fill: color,
    };
  });

  return (
    <Card className="col-span-1 md:col-span-5 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Organizations</CardTitle>
        <CardDescription>Events by organization of all years</CardDescription>
      </CardHeader>
      <CardContent>
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
