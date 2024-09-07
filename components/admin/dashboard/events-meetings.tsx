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
import { Calendar } from "@/components/ui/calendar";
import React from "react";
type Meeting = z.infer<typeof MeetingSchema>;

export default function EventsMeetings({ meetings }: { meetings: Meeting[] }) {
  const meetingDates = meetings.map((meeting) => {
    const date = new Date(meeting.date);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Meetings</CardTitle>
        <CardDescription>Upcoming meetings and events</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={meetingDates}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell className="font-medium">{meeting.note}</TableCell>
                <TableCell>
                  {meeting.date.toUTCString().split(" ").slice(0, 4).join(" ")}
                </TableCell>
                <TableCell>{meeting.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
