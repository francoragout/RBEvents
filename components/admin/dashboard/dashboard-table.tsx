"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MeetingSchema } from "@/lib/validations";
import { z } from "zod";
import MeetingCreateForm from "./meeting-create-form";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DeleteMeeting } from "@/actions/meeting";
import { toast } from "sonner";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Meeting = z.infer<typeof MeetingSchema>;

export default function DashboardTable({ meetings }: { meetings: Meeting[] }) {
  const handleDelete = async (id: string) => {
    DeleteMeeting(id).then((response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <Card className="col-span-1 md:col-span-7 lg:col-span-3">
      <div className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>Meetings</CardTitle>
          <CardDescription>
            You have {meetings.length} upcoming meetings.
          </CardDescription>
        </CardHeader>
        <MeetingCreateForm />
      </div>
      <CardContent>
        <ScrollArea className="h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center">
                  Date
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                </TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>
                    {meeting.date
                      .toUTCString()
                      .split(" ")
                      .slice(1, 4)
                      .join(" ")}
                  </TableCell>
                  <TableCell className="text-primary font-bold">
                    {meeting.time}
                  </TableCell>
                  <TableCell className="font-medium">{meeting.note}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            className="flex justify-start pl-2"
                            onClick={() => handleDelete(meeting.id ?? "")}
                            size="sm"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
