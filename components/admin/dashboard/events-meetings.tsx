"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MeetingCreateForm from "./meeting-create-form";
import { z } from "zod";
import { MeetingSchema } from "@/lib/validations";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
type Meeting = z.infer<typeof MeetingSchema>;

export default function EventsMeetings({ meetings }: { meetings: Meeting[] }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Meetings</CardTitle>
        <CardDescription>Upcoming meetings and events</CardDescription>
      </CardHeader>
      <CardContent>
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border w-fit"
    />
        <MeetingCreateForm />
        <Table>
          <TableCaption>A list of your recent create meetings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Note</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reminder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell className="font-medium">{meeting.note}</TableCell>
                <TableCell>{meeting.date.toUTCString().split(" ").slice(0, 4).join(" ")}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell className="text-right">{meeting.reminder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
