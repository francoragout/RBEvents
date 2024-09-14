import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EventSchema, MeetingSchema } from "@/lib/validations";
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
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription className="flex gap-1">
          Keep track of your
          <span className="font-bold text-primary">Meetings</span>
          and
          <span className="font-bold text-main">Events</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={dates}
          modifiers={modifiers}
          modifiersClassNames={{
            events:
              "bg-[hsl(12,76%,61%)] text-primary-foreground hover:bg-[hsl(12,76%,61%)] hover:text-primary-foreground focus:bg-[hsl(12,76%,61%)] focus:text-primary-foreground dark:bg-[hsl(220,70%,50%)] dark:text-primary-foreground dark:hover:bg-[hsl(220,70%,50%)] dark:hover:text-primary-foreground dark:focus:bg-[hsl(220,70%,50%)] dark:focus:text-primary-foreground",
          }}
        />
      </CardContent>
    </Card>
  );
}
