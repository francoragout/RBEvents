"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function EventsMeetings() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Meetings</CardTitle>
        <CardDescription>Upcoming meetings and events</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
