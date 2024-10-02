"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EventSchema, MeetingSchema } from "@/lib/validations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { z } from "zod";

type Meeting = z.infer<typeof MeetingSchema>;
type Event = z.infer<typeof EventSchema>;

interface DashboardCalendarProps {
  meetings: Meeting[];
  events: Event[];
}

export default function DashboardCalendar({
  meetings,
  events,
}: DashboardCalendarProps) {
  const meetingsDates = meetings.map((meeting) => {
    const date = new Date(meeting.date);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  });

  const eventsDates = events.map((event) => {
    const date = new Date(event.date);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  });

  const dates = [...meetingsDates, ...eventsDates];

  const modifiers = {
    events: eventsDates,
    meetings: meetingsDates,
  };

  return (
    <Card className="col-span-1 md:col-span-5 lg:col-span-2">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription className="flex gap-1">
          Keep track of your
          <span className="font-bold text-primary">Meetings</span>
          and
          <span className="font-bold text-foreground">Events</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <DayPicker
          mode="multiple"
          selected={dates}
          showOutsideDays={true}
          className="p-3"
          modifiers={modifiers}
          modifiersClassNames={{
            events:
              "bg-foreground text-background hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background",
            meetings:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground meetings-opacity",
          }}
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
            ),
            day_range_end: "day-range-end",
            day_today: "bg-accent text-accent-foreground",
            day_outside:
              "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: (props) => <ChevronLeft {...props} className="h-4 w-4" />,
            IconRight: (props) => (
              <ChevronRight {...props} className="h-4 w-4" />
            ),
          }}
        />
      </CardContent>
    </Card>
  );
}
