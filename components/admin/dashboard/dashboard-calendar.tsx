import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const bothDates = eventsDates.filter((date) => meetingsDates.includes(date));
  const modifiers = {
    events: eventsDates,
    meetings: meetingsDates,
    both: bothDates,
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription className="flex gap-1">
          Keep track of your
          <p className="font-bold text-primary">Meetings</p>
          and
          <p className="font-bold text-orange">Events</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={dates}
          modifiers={modifiers}
          modifiersClassNames={{
            events:
              "bg-orange text-orange-foreground hover:bg-orange hover:text-orange-foreground focus:bg-orange focus:text-orange-foreground",
            meetings:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            both: "bg-orange text-orange-foreground hover:bg-orange hover:text-orange-foreground focus:bg-orange focus:text-orange-foreground",
          }}
        />
      </CardContent>
    </Card>
  );
}
