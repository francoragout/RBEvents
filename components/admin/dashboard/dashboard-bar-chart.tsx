"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";
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
import { useState } from "react";

const chartConfig = {
  events: {
    label: "Eventos",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Event = z.infer<typeof EventSchema>;

export function DashboardBarChart({ events }: { events: Event[] }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from(
    new Set(events.map((event) => new Date(event.date).getFullYear()))
  );

  const filteredEvents = events.filter(
    (event) => new Date(event.date).getFullYear() === selectedYear
  );

  const eventsPerMonth = new Array(12).fill(0);

  filteredEvents.forEach((event) => {
    const month = new Date(event.date).getMonth();
    eventsPerMonth[month]++;
  });

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const chartData = monthNames.map((month, index) => ({
    month,
    events: eventsPerMonth[index],
  }));

  const months_with_events = new Set(
    filteredEvents.map((event) => new Date(event.date).getMonth() + 1)
  ).size;

  const averageEvents = filteredEvents.length / (months_with_events || 1);

  const currentMonth = new Date().getMonth();

  const difference = eventsPerMonth[currentMonth] - averageEvents;

  return (
    <Card className="col-span-1 md:col-span-7 lg:col-span-3">
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
          <CardDescription>
            Tienes {filteredEvents.length} eventos este año
          </CardDescription>
        </CardHeader>
        <div>
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-32 me-6 h-8">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Años</SelectLabel>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="events"
              fill="var(--color-events)"
              radius={8}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={1} />}
            />
            <ReferenceLine
              y={averageEvents}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Promedio"
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
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {difference > 0 ? (
          <div className="flex gap-1">
            Tendencia de
            <span className="font-medium text-primary">
              {difference.toFixed(2)}
            </span>
            por arriba del promedio este mes
            <TrendingUp className="h-4 w-4" />
          </div>
        ) : difference < 0 ? (
          <div className="flex gap-1">
            Tendencia de
            <span className="font-medium text-primary">
              {difference.toFixed(2)}
            </span>
            por debajo del promedio este mes
            <TrendingDown className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex gap-1">
            No hay diferencia respecto al promedio este mes
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
