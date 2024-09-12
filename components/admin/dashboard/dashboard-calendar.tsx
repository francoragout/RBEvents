import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MeetingSchema } from "@/lib/validations";
import { z } from "zod";

type Meeting = z.infer<typeof MeetingSchema>;

export default function DashboardCalendar({
  meetings,
}: {
  meetings: Meeting[];
}) {

  const dates = meetings.map((meeting) => {
    const date = new Date(meeting.date);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  });

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>
          Keep track of your meetings and events.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar mode="multiple" className="" selected={dates}/>
      </CardContent>
    </Card>
  );
}
